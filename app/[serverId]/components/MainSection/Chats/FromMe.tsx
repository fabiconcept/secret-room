import { countEmojis, isChatAcronym, isOnlyEmojis, wrapUrlsWithAnchors } from "@/utils";
import { useFileDownload } from "@/utils/Hooks/useFileDownload";
import useSoundEffect from "@/utils/Hooks/useSoundEffect";
import clsx from "clsx";
import Image from "next/image";
import { FaArrowDown, FaCheckDouble, FaEye, FaSpinner } from "react-icons/fa6";

export default function FromMe({
    message
}: {
    message: { content: string, read: boolean, username: string, attachmentUrl?: string, sent: boolean }
}) {
    const playSwingSound = useSoundEffect('/audio/swing.mp3', { volume: 0.5, preload: true });

    const isEmoji = isOnlyEmojis(message.content);
    const emojiCount = countEmojis(message.content);
    const [status, startDownload] = useFileDownload();

    const messageIsChatAcronym = isChatAcronym(message.content);

    const attachmentIsPDF = message.attachmentUrl?.endsWith(".pdf");

    return (
        <>
            {message.attachmentUrl && <div className="flex items-end justify-end mb-2">
                {attachmentIsPDF && (
                    <div className={clsx(
                        "gap-2 w-40 h-52 rounded-lg rounded-tr-[3rem] border border-white/5 bg-red-600/20 backdrop-blur-[1px] grid place-items-center relative overflow-hidden",
                        "after:absolute after:top-0 after:right-0 after:h-10 after:w-10 after:bg-red-500/40 after:rounded-bl-lg after:shadow-2xl"
                    )}>
                        <div className={clsx(
                            "absolute top-0 left-0 w-full h-full bg-black/70 grid place-items-center",
                            status === 'downloading' ? "opacity-100" : "opacity-0 hover:opacity-100 "
                        )}>
                            <button 
                                title="Download PDF" 
                                className={clsx(
                                    "h-10 w-10 rounded-full grid place-items-center bg-white",
                                    status === 'downloading' ? "" : "cursor-pointer active:scale-95"
                                )}
                                onClick={() => {
                                    if (!message.attachmentUrl) return;
                                    if(status === 'downloading') return;
                                    playSwingSound.play();
                                    startDownload(message.attachmentUrl);
                                }}
                            >
                                {status === 'downloading' ? <FaSpinner className="text-blue-500 text-2xl animate-spin" /> : <FaArrowDown className="text-blue-500" />}
                            </button>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="grid gap-2">
                                <div className="w-12 h-1 bg-white border rounded-full"></div>
                                <div className="w-12 h-1 bg-white border rounded-full"></div>
                                <div className="w-12 h-1 bg-white border rounded-full"></div>
                            </div>
                            <span className="text-white font-semibold text-2xl">PDF</span>
                        </div>
                    </div>
                )}
                {!attachmentIsPDF && (
                    <div className="gap-2 w-40 h-52 rounded-2xl border border-white/20 bg-white/5 grid place-items-center relative overflow-hidden">
                        <div className={clsx(
                            "absolute top-0 left-0 w-full h-full bg-black/70 grid place-items-center",
                            status === 'downloading' ? "opacity-100" : "opacity-0 hover:opacity-100 "
                        )}>
                            <button 
                                title="Download PDF" 
                                className={clsx(
                                    "h-10 w-10 rounded-full grid place-items-center bg-white",
                                    status === 'downloading' ? "" : "cursor-pointer active:scale-95"
                                )}
                                onClick={() => {
                                    if (!message.attachmentUrl) return;
                                    if(status === 'downloading') return;
                                    playSwingSound.play();
                                    startDownload(message.attachmentUrl);
                                }}
                            >
                                {status === 'downloading' ? <FaSpinner className="text-blue-500 text-2xl animate-spin" /> : <FaArrowDown className="text-blue-500" />}
                            </button>
                        </div>
                        <Image
                            src={message.attachmentUrl || ''}
                            alt="Attachment"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>}
            <div
                className="flex items-end justify-end gap-2 w-full group"
            >
                {!isEmoji ? (

                    messageIsChatAcronym ? <div className="text-5xl max-sm:text-9xl font-bold uppercase">
                        {message.content}
                    </div> :
                        <div
                            className={clsx(
                                "md:max-w-1/2 max-w-[100%] bg-green-600/10 border border-green-500/20 backdrop-blur-[1px] rounded-4xl rounded-br-none py-5 px-8",
                                "z-10 relative",
                            )}
                            dangerouslySetInnerHTML={{
                                __html: wrapUrlsWithAnchors(message.content),
                            }}
                        />
                ) : (
                    <div className={clsx(
                        "md:max-w-1/2 max-w-[100%]",
                        "z-10 relative",
                        emojiCount > 1 ? "text-5xl" : "text-9xl -mb-3"
                    )}>
                        {message.content}
                    </div>
                )}
                <div className="flex flex-col items-center gap-2">
                    <div className="text-xl">
                        {message.read ?
                            <FaEye className="text-green-400" /> :
                            <FaCheckDouble className="text-gray-400" />
                        }
                    </div>
                    <div className="h-10 w-10 border grid place-items-center border-gray-500/20 rounded-full bg-white/20 active:opacity-40">
                        <span className="text-gray-200 font-semibold">{message.username.split("")[0].toUpperCase()}</span>
                    </div>
                </div>
            </div>
        </>
    );
}