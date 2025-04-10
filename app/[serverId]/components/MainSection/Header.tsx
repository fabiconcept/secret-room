import { useServerStore } from "@/store/useServerStore";
import clsx from "clsx";
import { FaPhoneAlt } from "react-icons/fa";
import { FaArrowLeftLong, FaDoorOpen, FaInfo, FaVideo } from "react-icons/fa6";
import { useAppStore } from "@/store/useAppStore";

export default function Header() {
    const { currentlyChatting, server, isOwner, removeCurrentlyChatting } = useServerStore();
    const { sideBarExpanded, toggleSideBar } = useAppStore();

    if (!server) return null;
    if (!currentlyChatting) return null;

    const handleCloseCurrentlyChatting = () => {
        if (!sideBarExpanded) toggleSideBar();
        removeCurrentlyChatting();
    }

    const handleLeaveServer = () => {
        
    }
    
    return (
        <div className="p-5 border-b border-gray-500/20 flex justify-between items-center bg-white/5 backdrop-blur-[1px]">
            <div className="flex items-center gap-4">
                {isOwner && <div onClick={handleCloseCurrentlyChatting} className="h-10 w-10 cursor-pointer active:scale-90 group rounded-full bg-white/20 active:opacity-40 flex items-center justify-center">
                    <FaArrowLeftLong className="text-sm group-active:-rotate-12" />
                </div>}
                {!isOwner && (
                    <div onClick={handleLeaveServer} className="h-10 w-10 cursor-pointer active:scale-90 group rounded-full bg-white/20 active:opacity-40 flex items-center justify-center">
                        <FaDoorOpen className="text-sm group-active:-rotate-12 text-red-200" />
                    </div>
                )}
                <div 
                    className={clsx(
                        "h-16 w-16 rounded-full overflow-hidden grid place-items-center",
                    )}
                    style={{
                        backgroundColor: currentlyChatting.bgColor,
                        color: currentlyChatting.textColor
                    }}
                >
                    {currentlyChatting.username[0].toUpperCase()}
                </div>
                <div>
                    <h3 className="text-white font-semibold">{currentlyChatting.username}</h3>
                    <p className="text-xs text-green-400">{currentlyChatting.isOnline ? 'Online' : 'Offline'}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-10 w-10 cursor-pointer active:scale-90 border border-transparent hover:border-white/20 group rounded-full bg-white/20 active:opacity-40 flex items-center justify-center">
                    <FaPhoneAlt className="group-active:-rotate-6" />
                </div>
                <div className="h-10 w-10 cursor-pointer active:scale-90 border border-transparent hover:border-white/20 group rounded-full bg-white/20 active:opacity-40 flex items-center justify-center">
                    <FaVideo className="group-active:-rotate-6" />
                </div>
                <div className="h-10 w-10 cursor-pointer active:scale-90 border border-transparent hover:border-white/20 group rounded-full bg-white/20 active:opacity-40 flex items-center justify-center">
                    <FaInfo className="group-active:-rotate-6" />
                </div>
            </div>
        </div>
    )
}