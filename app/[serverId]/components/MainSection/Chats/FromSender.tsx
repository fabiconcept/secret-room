import clsx from "clsx";
import { FaCheckDouble } from "react-icons/fa6";

export default function FromSender({ message }: { message: string }) {
    return (
        <div className="flex items-end gap-2 w-full group">
            <div className="flex flex-col items-center gap-2">
                <div className="text-xl group-hover:opacity-100 opacity-0">
                    {/* <FaEye className="text-green-400"/> */}
                    <FaCheckDouble className="text-gray-400" />
                </div>
                <div className="h-10 w-10 border grid place-items-center border-gray-500/20 rounded-full bg-white/20 active:opacity-40">
                    <span className="text-gray-200 font-semibold">D</span>
                </div>
            </div>
            <div className={clsx(
                "max-w-1/2 bg-gray-500/20 border border-gray-500/50 backdrop-blur-[1px] rounded-4xl rounded-bl-none py-5 px-8",
                "z-10 relative",
            )}>
                {message}
            </div>
        </div>
    )
}