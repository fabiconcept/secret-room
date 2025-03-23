"use client";

import { useServerStore } from "@/store/useServerStore";
import { formatDistanceToNow } from 'date-fns';

interface UserCardProps {
    username: string;
    isOnline: boolean;
    lastSeen: Date;
}

const UserCard = ({ username, isOnline, lastSeen }: UserCardProps) => (
    <div className="flex items-center gap-3 px-4 py-1 hover:bg-white/2 transition-colors cursor-pointer">
        <div className="relative">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                {username[0].toUpperCase()}
            </div>
            <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-black/20 ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
        </div>
        <div className="flex-1">
            <h3 className="text-white font-medium">{username}</h3>
            {!isOnline && (
                <p className="text-xs text-gray-400">
                    Last seen {formatDistanceToNow(new Date(lastSeen))} ago
                </p>
            )}
        </div>
    </div>
);

export default function SideBar() {
    const { server, activeUsers, isOwner, } = useServerStore();

    if (!server) return null;

    return (
        <section className="flex flex-col w-[clamp(20rem,100%,25rem)] h-full bg-black/20 border-r border-b border-white/10">
            <header className={"w-full p-10 text-center text-white border-b border-gray-500/20 text-xl font-semibold bg-black/5 backdrop-blur-[2px]"}>
                <span className="glitch" data-text={`${server?.server_name}`}>{server?.server_name}</span>
            </header>
            <div className="flex-1 w-full overflow-y-auto bg-white/5">
                <div className="">
                    {isOwner && <h2 className="text-gray-500 text-sm mx-2 mt-2 font-medium mb-2">Connected Users <span className="opacity-50">({activeUsers.length})</span></h2>}

                    <div className="">
                        {activeUsers.map((user) => {
                            if (isOwner) {
                                return (<UserCard
                                    key={user.userId}
                                    username={user.username}
                                    isOnline={user.isOnline}
                                    lastSeen={user.lastSeen}
                                />)
                            }
                            if (user.userId !== server.owner) return null;
                            return (<UserCard
                                key={user.userId}
                                username={user.username}
                                isOnline={user.isOnline}
                                lastSeen={user.lastSeen}
                            />)
                        }
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
