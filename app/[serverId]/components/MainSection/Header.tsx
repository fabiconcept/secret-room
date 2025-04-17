import { useServerStore } from "@/store/useServerStore";
import clsx from "clsx";
import { FaPhoneAlt } from "react-icons/fa";
import { FaArrowLeftLong, FaDoorOpen, FaInfo, FaVideo } from "react-icons/fa6";
import { useAppStore } from "@/store/useAppStore";
import { socketService } from "@/utils/services/socket.service";
import { formatLastSeen } from "@/utils";
import useSoundEffect from "@/utils/Hooks/useSoundEffect";

export default function Header() {
    const { currentlyChatting, server, isOwner, removeCurrentlyChatting } = useServerStore();
    const { sideBarExpanded, toggleSideBar } = useAppStore();
    const playSwingSound = useSoundEffect('/audio/swing.mp3', { volume: 0.5, preload: true });

    if (!server) return null;
    if (!currentlyChatting) return null;

    const handleCloseCurrentlyChatting = () => {
        if (!sideBarExpanded) toggleSideBar();
        removeCurrentlyChatting();
    }

    const handleLeaveServer = () => {
        if (confirm('Are you sure you want to leave this server?')) {
            socketService.emitLeaveServer();
            removeCurrentlyChatting();
        }
    }
    
    return (
        <div className="p-5 border-b border-gray-500/20 flex justify-between items-center bg-white/5 backdrop-blur-[1px]">
            <div className="flex items-center gap-4">
                {isOwner && <div title="Close currently chatting" onClick={() => {
                    playSwingSound.play();
                    handleCloseCurrentlyChatting()
                }} className="h-10 w-10 cursor-pointer active:scale-90 group rounded-full bg-white/20 active:opacity-40 flex items-center justify-center">
                    <FaArrowLeftLong className="text-sm group-active:-rotate-12" />
                </div>}
                {!isOwner && (
                    <div title="Leave server" onClick={() => {
                        playSwingSound.play();
                        handleLeaveServer()
                    }} className="h-10 w-10 cursor-pointer active:scale-90 group rounded-full bg-white/20 active:opacity-40 flex items-center justify-center">
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
                    <h3 className="text-white font-semibold capitalize">{currentlyChatting.username}</h3>
                    <p className={clsx("text-xs", currentlyChatting.isOnline ? "text-green-400" : "text-gray-400")}>{currentlyChatting.isOnline ? 'Online' : `Last seen ${formatLastSeen(new Date(currentlyChatting.lastSeen))} ago`}</p>
                </div>
            </div>
            {!isOwner && <div className="flex items-center gap-2 max-sm:hidden">
                <header
                    className={clsx(
                        "w-full p-5 text-center text-white text-xl font-semibold",
                    )}
                >
                    <span className="text-gray-400 text-sm font-medium">Current Server: </span><span className="glitch" data-text={`${server?.server_name}`}>{server?.server_name}</span>
                </header>
            </div>}
        </div>
    )
}