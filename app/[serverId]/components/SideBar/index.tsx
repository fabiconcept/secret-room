"use client";

import { useServerStore } from "@/store/useServerStore";
import UserCard from "./UserCard";
import { performCopy } from "@/utils";
import { apiService } from "@/utils/services/api.service";
import { getItem } from "@/utils/localStorage";
import { Auth } from "@/app/types/index.type";
import { appURL } from "@/constants/index.constant";
import { useAppStore } from "@/store/useAppStore";
import clsx from "clsx";
import { useEffect } from "react";
import { FaCopy } from "react-icons/fa6";
import useSoundEffect from "@/utils/Hooks/useSoundEffect";


export default function SideBar() {
    const { server, activeUsers, isOwner, currentlyChatting, messages } = useServerStore();
    const { sideBarExpanded, setSideBarExpanded } = useAppStore();
    const playSwingSound = useSoundEffect('/audio/swing.mp3', { volume: 0.5, preload: true });

    
    useEffect(() => {
        if (!currentlyChatting) {
            setSideBarExpanded(true);
            return;
        }
        setSideBarExpanded(false);
    }, [currentlyChatting, setSideBarExpanded])
   
    if (!server) return null;
    if (!isOwner) return null;
    
    const generateUniqueInvitation = async () => {
        const authFallback = {
            userId: '',
            username: '',
            token: ''
        };
        playSwingSound.play();
        const auth = getItem<Auth>(server.server_id, authFallback);
        try {
            const response = await apiService.generateUniqueInvitation(server.server_id, auth.token);

            if (response.data) {
                const payload = `${appURL}/uinvite/${response.data.inviteCode}`;
                performCopy(payload);
            }
        } catch (error) {
            console.error('Error generating unique invitation:', error);
        }
    };

    const sortedUsers = [...activeUsers].sort((userA, userB) => {
        // Find last message for user A
        const lastMessageA = messages
            .filter(message => message.receiverId === userA.userId || message.senderId === userA.userId)
            .pop();

        // Find last message for user B
        const lastMessageB = messages
            .filter(message => message.receiverId === userB.userId || message.senderId === userB.userId)
            .pop();

        // Get the most recent activity time for each user
        const lastActivityTimeA = new Date(lastMessageA?.createdAt || userA.lastSeen);
        const lastActivityTimeB = new Date(lastMessageB?.createdAt || userB.lastSeen);

        // Sort in descending order (most recent first)
        return lastActivityTimeB.getTime() - lastActivityTimeA.getTime();
    });

    return (
        <section className="relative">
            <section
                className={clsx(
                    "flex overflow-hidden flex-col h-full bg-black/20 border-r border-b border-white/10",
                    sideBarExpanded ? "w-[clamp(20rem,100%,30rem)] max-sm:w-full" : "w-0"
                )}
            >
                <div className="flex-1 w-full overflow-y-auto bg-white/5">
                    <div className="">
                        <header
                            className={clsx(
                                "w-full p-5 text-center text-white border-b border-gray-500/20 text-xl font-semibold bg-black/5 backdrop-blur-[2px]",
                            )}
                        >
                            <span className="glitch" data-text={`${server?.server_name}`}>{server?.server_name}</span>
                        </header>
                        <div className="py-1">
                            {sortedUsers.map((user) => {
                                if (isOwner) {
                                    return (<UserCard
                                        key={user.userId}
                                        userId={user.userId}
                                        username={user.username}
                                        isOnline={user.isOnline}
                                        lastSeen={user.lastSeen}
                                        bgColor={user.bgColor}
                                        textColor={user.textColor}
                                    />)
                                }
                                if (user.userId !== server.owner) return null;
                                return (<UserCard
                                    key={user.userId}
                                    userId={user.userId}
                                    username={user.username}
                                    isOnline={user.isOnline}
                                    lastSeen={user.lastSeen}
                                    bgColor={user.bgColor}
                                    textColor={user.textColor}
                                />)
                            }
                            )}
                        </div>
                    </div>
                </div>
                {isOwner && <footer className="w-full p-5 text-center text-white text-sm flex items-center gap-3 border-b border-gray-500/20 bg-black/5 backdrop-blur-[2px]">
                    <button
                        className="flex border group border-white/5 hover:border-white/20 cursor-pointer active:scale-95 text-center items-center justify-center gap-2 p-3 rounded-3xl bg-white/10 flex-1"
                        title="Copy Global Invite"
                        onClick={() => {
                            playSwingSound.play();
                            performCopy(`${appURL}/ginvite/${server?.global_invitation_id}` || '')
                        }}
                    >
                        <FaCopy className="text-[0px] group-hover:opacity-100 opacity-0 group-hover:text-[16px]" />
                        Global Invite
                    </button>
                    <button
                        className="flex border group whitespace-nowrap border-white/5 hover:border-white/20 cursor-pointer active:scale-95 text-center items-center justify-center gap-2 p-3 rounded-3xl bg-white/10 flex-1"
                        title="Generate Unique Invite"
                        onClick={generateUniqueInvitation}
                    >
                        <FaCopy className="text-[0px] group-hover:opacity-100 opacity-0 group-hover:text-[16px]" />
                        Unique Invite
                    </button>
                </footer>}
            </section>
        </section>
    )
}
