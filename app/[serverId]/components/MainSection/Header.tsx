import { useServerStore } from "@/store/useServerStore";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { FaArrowLeftLong, FaCamera, FaInfo, FaVideo } from "react-icons/fa6";

export default function Header() {
    return (
        <div className="p-5 border-b border-gray-500/20 flex justify-between items-center bg-white/5 backdrop-blur-[1px]">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 cursor-pointer active:scale-90 group rounded-full bg-white/20 active:opacity-40 flex items-center justify-center">
                    <FaArrowLeftLong className="text-sm group-active:-rotate-12" />
                </div>
                <div className="h-16 w-16 rounded-full overflow-hidden grid place-items-center">
                    <Image
                        src={"/assets/pfp.jpg"}
                        alt={""}
                        width={64}
                        height={64}
                    />
                </div>
                <div>
                    <h3 className="text-white font-semibold">Elvis Preston</h3>
                    <p className="text-xs text-green-400">Online</p>
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