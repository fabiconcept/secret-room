'use client';

import { useEffect } from 'react';
import { useServerStore } from '@/store/useServerStore';
import { getItem } from '@/utils/localStorage';
import { redirect } from 'next/navigation';
import { apiService } from '@/utils/services/api.service';
import { socketService } from '@/utils/services/socket.service';
import { toast } from 'react-hot-toast';
import { ServerResponse } from '@/app/types/server.types';
import { Auth } from '@/app/types/index.type';
import { useAppStore } from '@/store/useAppStore';
import useSoundEffect from '@/utils/Hooks/useSoundEffect';
import useSettingStore from '@/store/useSettingStore';

interface ServerProviderProps {
    children: React.ReactNode;
    server: ServerResponse;
}

const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const ErrorDisplay = ({ error }: { error: string }) => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 p-4 rounded-lg shadow-sm">
            <p className="text-red-600">{error}</p>
        </div>
    </div>
);

export default function ServerProvider({ children, server }: ServerProviderProps) {
    const { 
        setServer, setUser, setError, setLoading, clearServer, setActiveUsers, 
        isOwner, error, isLoading, setIsOwner, setCurrentlyChatting, 
        addMessage, onMessageRead, populateMessages, addTypingUser, removeTypingUser 
    } = useServerStore();
    const { server_id } = server;
    const { setHomeBackgroundFontSize } = useAppStore();

    const settings = useSettingStore();
    const playPopSound = useSoundEffect('/audio/pop.mp3', { 
        volume: settings.buttonSound.isMuted ? 0 : settings.buttonSound.volume, 
        preload: true 
    });
    const playCreakingSound = useSoundEffect('/audio/creaking-door.mp3', { 
        volume: settings.crankSound.isMuted ? 0 : settings.crankSound.volume, 
        preload: true 
    });
    const playWoshSound = useSoundEffect('/audio/wosh.mp3', { 
        volume: settings.otherUISound.isMuted ? 0 : settings.otherUISound.volume, 
        preload: true 
    });
    const playSeenSound = useSoundEffect('/audio/seen.mp3', { 
        volume: settings.otherUISound.isMuted ? 0 : settings.otherUISound.volume, 
        preload: true 
    });

    useEffect(() => {
        playPopSound.adjustVolume(settings.buttonSound.isMuted ? 0 : settings.buttonSound.volume);
    }, [settings.buttonSound]);

    useEffect(() => {
        playCreakingSound.adjustVolume(settings.crankSound.isMuted ? 0 : settings.crankSound.volume);
    }, [settings.crankSound]);

    useEffect(() => {
        playWoshSound.adjustVolume(settings.otherUISound.isMuted ? 0 : settings.otherUISound.volume);
    }, [settings.otherUISound]);

    useEffect(() => {
        playSeenSound.adjustVolume(settings.otherUISound.isMuted ? 0 : settings.otherUISound.volume);
    }, [settings.otherUISound]);

    // before page unmount
    useEffect(() => {
        return () => {
            clearServer();
        };
    }, []);

    useEffect(() => {
        const initializeServerState = async () => {
            playCreakingSound.play();
            try {
                setLoading(true);
                const authFallback = {
                    userId: '',
                    username: '',
                    token: ''
                };

                const auth = getItem<Auth>(server_id, authFallback);

                if (!auth.userId || !auth.token) {
                    clearServer();
                    redirect('/');
                }

                const isServerOwner = auth.userId === server.owner;

                const { data: messages } = await apiService.getServerMessages(server.server_id, auth.token);

                setIsOwner(isServerOwner);

                setServer(server);
                setUser({
                    userId: auth.userId,
                    username: auth.username,
                    token: auth.token
                });

                populateMessages(messages);
                setHomeBackgroundFontSize(32);

                if (isServerOwner) {
                    const { data: activeUsers } = await apiService.getServerActiveUsers(server.server_id, auth.token);
                    setActiveUsers(activeUsers.filter((user) => user.userId !== auth.userId));
                }

                // Initialize socket connection
                socketService.connect(server_id, auth.token);

                // Setup socket event handlers
                socketService.onServerMessage((message) => {
                    toast(message.content, {
                        icon: '📢'
                    });

                });

                socketService.onServerError((message) => {
                    toast.error(message.content);
                    if (message.type === 'error') {
                        clearServer();
                        redirect('/');
                    }
                });

                socketService.onServerJoined((message) => {
                    toast.success(message.content);
                });

                socketService.onServerLeft((message) => {
                    toast(message.content, {
                        icon: '👋'
                    });
                    clearServer();
                    redirect('/');
                });

                socketService.onServerDeleted(() => {
                    if (isOwner) return;
                    toast.error('Server deleted');
                    clearServer();
                    redirect('/');
                });

                socketService.onActiveUsersUpdated((users) => {
                    const filteredUsers = users.filter((user) => user.userId !== auth.userId);
                    const serverOwner = filteredUsers.find((user) => user.userId === server.owner);

                    if(!isServerOwner) {
                        setCurrentlyChatting(serverOwner!);
                    }
                    setActiveUsers(filteredUsers);
                });

                socketService.onUserTyping(({userId, typing, typingTo}) => {
                    const relevantUsers = typingTo === auth.userId;
                    if (!relevantUsers) return;

                    if(typing) {
                        addTypingUser(userId);
                    }else{
                        removeTypingUser(userId);
                    }
                });

                socketService.onNewMessage((message) => {
                    const { receiverId, senderId } = message;
                    const relevantMessages = receiverId === auth.userId || senderId === auth.userId;

                    if (!relevantMessages) return;
                    
                    if(receiverId === auth.userId) {
                        if(message.attachmentUrl) {
                            playWoshSound.play();
                        }else{
                            playPopSound.play();
                        }
                    }

                    addMessage(message);
                });

                socketService.onMessageRead((messageId) => {
                    const message = messages.find((message) => message.messageId === messageId);

                    if(message && message.senderId === auth.userId) {
                        playSeenSound.play();
                    }
                    onMessageRead(messageId);
                });

            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to initialize server state');
                clearServer();
            } finally {
                setLoading(false);
            }
        };

        initializeServerState();

        return () => {
            socketService.disconnect(server_id);
            socketService.removeAllListeners();
            clearServer();
        };
    }, [server, server_id]);

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {error && <ErrorDisplay error={error} />}
            {/* {!isLoading && !error && children} */}
            {!isLoading && !error && children}
        </>
    );
}
