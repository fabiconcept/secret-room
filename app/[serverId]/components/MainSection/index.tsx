"use client"
import { useServerStore } from "@/store/useServerStore";
import Header from "./Header";
import ChatBox from "./ChatBox";
import ChatSection from "./Chats/Index";
import { getItem } from "@/utils/localStorage";
import { apiService } from "@/utils/services/api.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useSoundEffect from "@/utils/Hooks/useSoundEffect";
import { FaTrash } from "react-icons/fa6";
import useSettingStore from "@/store/useSettingStore";
import { useEffect } from "react";

export default function MainSection() {
    const { server, currentlyChatting, isOwner } = useServerStore();
    const router = useRouter();
    const { buttonSound, otherUISound } = useSettingStore();


    const playPressSound = useSoundEffect('/audio/press.mp3', { volume: buttonSound.isMuted ? 0 : buttonSound.volume, preload: true });
    const playSwingSound = useSoundEffect('/audio/swing.mp3', { volume: otherUISound.isMuted ? 0 : otherUISound.volume, preload: true });

    useEffect(() => {
        playPressSound.adjustVolume(buttonSound.isMuted ? 0 : buttonSound.volume);
    }, [buttonSound]);

    useEffect(() => {
        playSwingSound.adjustVolume(otherUISound.isMuted ? 0 : otherUISound.volume);
    }, [otherUISound]);

    
    if (!server) return null;

    const deleteServer = async () => {
        if (confirm('Are you sure you want to delete this server?')) {

            try {
                const serverId = server.server_id;
                const authFallback = {
                    userId: '',
                    username: '',
                    token: ''
                };
    
                const auth = getItem<typeof authFallback>(serverId, authFallback);
                await apiService.deleteServer(serverId, auth.token);
                playSwingSound.play();

                router.push('/');
            } catch (error) {
                console.error('Failed to delete server:', error);
                throw error;
            }
        }else{
            throw new Error('You chickened out');
        }
    }

    const handleDeleteServer = () => {
        const promise = deleteServer();
        toast.promise(promise, {
            loading: 'Deleting server...',
            success: 'Server deleted successfully',
            error: 'Failed to delete server'
        });
    }
    
    return (
        <div className="flex-1 h-full flex flex-col relative">
            {!currentlyChatting && isOwner && <div onClick={()=>{
                playPressSound.play();
                setTimeout(() => {
                    handleDeleteServer();
                }, 200);
            }} className="absolute top-0 
            right-0 p-3 max-sm:p-2">
                <button className="px-5 py-2 max-sm:py-4 rounded-lg text-sm bg-red-500/10 border border-red-500/10 hover:bg-red-500 hover:text-white cursor-pointer active:scale-90 text-white">
                    <span className="max-sm:hidden">Delete this server</span>
                    <FaTrash className="max-sm:block hidden" />
                </button> 
            </div>}
            {!currentlyChatting && <div className="absolute max-sm:hidden top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-7 text-2xl text-gray-500">
                Select a user to chat 
            </div>}
            {currentlyChatting && (
                <>
                    <Header />
                    <ChatSection />
                    <ChatBox />
                </>
            )}
        </div>
    )
}
