"use client";

import { useServerStore } from '@/store/useServerStore';
import useSoundEffect from '@/utils/Hooks/useSoundEffect';
import clsx from 'clsx';
import { FaPaperclip } from 'react-icons/fa6';

interface UserCardProps {
    userId: string;
    username: string;
    isOnline: boolean;
    lastSeen: Date;
    bgColor: string;
    textColor: string;
}

export default function UserCard({ userId, username, isOnline, bgColor, textColor }: UserCardProps) {
    const { server, messages, setCurrentlyChatting, activeUsers, typingUsers } = useServerStore();
    const playOpenSound = useSoundEffect('/audio/open.mp3', { volume: 0.5, preload: true });
    const playPressSound = useSoundEffect('/audio/press.mp3', { volume: 0.25, preload: true });

    if (!server) return null;

    const lastMessage = messages.map((message) => {
        if (message.receiverId === userId || message.senderId === userId) {
            return message;
        }
        return null;
    }).filter(Boolean).pop();

    const handleSetCurrentlyChatting = () => {
        playPressSound.play();
        const user = activeUsers.find((user) => user.userId === userId);
        if (!user) return;
        playOpenSound.play();
        setCurrentlyChatting(user);
    }

    return (
        <div className=''>
            <div onClick={handleSetCurrentlyChatting} className="flex items-center gap-3 px-4 py-3 border-y border-gray-500/20 bg-white/2 hover:bg-white/5 transition-colors cursor-pointer">
                <div className="relative">
                    <div
                        className={clsx(
                            "w-16 border-2 border-gray-500/50 h-16 rounded-full flex items-center justify-center text-xl font-semibold",
                        )}
                        style={{
                            backgroundColor: bgColor,
                            color: textColor
                        }}
                    >
                        {username[0].toUpperCase()}
                    </div>
                    <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-black/20 ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
                </div>
                <div className="flex-1 grid gap-1">
                    <h3 className="text-white font-semibold capitalize">{username}</h3>
                    <p className={clsx("text-sm w-[90%] truncate", typingUsers.includes(userId) ? "text-orange-400 animate-pulse" : lastMessage?.readByReceiver === false ? "text-white" : "text-gray-400")}>
                        {typingUsers.includes(userId) ? 'Typing...' : lastMessage ? lastMessage.content : 'No messages yet.'}
                    </p>
                </div>
                <div>
                    {lastMessage?.attachmentUrl &&(
                        <FaPaperclip/>
                    )}
                </div>
            </div>
        </div>
    );
}