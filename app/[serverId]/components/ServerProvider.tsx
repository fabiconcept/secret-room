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
    const { setServer, setUser, setError, setLoading, clearServer, setActiveUsers, error, isLoading, setIsOwner, isOwner } = useServerStore();
    const { server_id } = server;

    useEffect(() => {
        const initializeServerState = async () => {
            try {
                setLoading(true);
                const authFallback = {
                    userId: '',
                    username: '',
                    token: ''
                };
                const auth = getItem<Auth>(server_id, authFallback);

                if (!auth.userId || !auth.username || !auth.token) {
                    clearServer();
                    redirect('/');
                }


                const isServerOwner = auth.userId === server.owner

                setIsOwner(isServerOwner);

                setServer(server);
                setUser({
                    userId: auth.userId,
                    username: auth.username,
                    token: auth.token
                });

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
                });

                socketService.onActiveUsersUpdated((users) => {
                    setActiveUsers(users.filter(user => user.userId !== auth.userId));
                });

            } catch (error: any) {
                setError(error.message || 'Failed to initialize server state');
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
            {!isLoading && !error && children}
        </>
    );
}
