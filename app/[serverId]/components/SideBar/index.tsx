"use client";

import { useServerStore } from "@/store/useServerStore";
import UserCard from "./UserCard";
import { performCopy } from "@/utils";
import { apiService } from "@/utils/services/api.service";
import { getItem } from "@/utils/localStorage";
import { Auth } from "@/app/types/index.type";
import { appURL } from "@/constants/index.constant";


export default function SideBar() {
    const { server, activeUsers, isOwner, } = useServerStore();

    
    if (!server) return null;
    if (!isOwner) return null;
    
    const generateUniqueInvitation = async () => {
        const authFallback = {
            userId: '',
            username: '',
            token: ''
        };
        const auth = getItem<Auth>(server.server_id, authFallback);
        try {
            const response = await apiService.generateUniqueInvitation(server.server_id, auth.token);
            console.log({
                response
            })

            if (response.data) {
                performCopy(`${appURL}/uinvite/${response.data.inviteCode}`);
            }
        } catch (error) {
            console.error('Error generating unique invitation:', error);
        }
    };
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
            {isOwner && <footer className="w-full p-5 text-center text-white flex items-center gap-3 border-b border-gray-500/20 bg-black/5 backdrop-blur-[2px]">
                <div 
                    className="flex border border-white/5 hover:border-white/20 cursor-pointer active:scale-95 text-center items-center justify-center gap-2 p-3 rounded-3xl bg-white/10 flex-1"
                    title="Copy Global Invite"
                    onClick={() => performCopy(`${appURL}/ginvite/${server?.global_invitation_id}` || '')}
                >
                    Global Invite
                </div>
                <div 
                    className="flex border border-white/5 hover:border-white/20 cursor-pointer active:scale-95 text-center items-center justify-center gap-2 p-3 rounded-3xl bg-white/10 flex-1"
                    title="Generate Unique Invite"
                    onClick={generateUniqueInvitation}
                >
                    Unique Invite
                </div>
            </footer>}
        </section>
    )
}
