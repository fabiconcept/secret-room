import { countEmojis, isChatAcronym, isOnlyEmojis, wrapUrlsWithAnchors } from "@/utils";
import { useFileDownload } from "@/utils/Hooks/useFileDownload";
import useSoundEffect from "@/utils/Hooks/useSoundEffect";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { FaArrowDown, FaCheckDouble, FaEye, FaPause, FaPlay, FaSpinner } from "react-icons/fa6";

export default function FromMe({
    message
}: {
    message: { content: string, read: boolean, username: string, attachmentUrl?: string, sent: boolean }
}) {
    const isEmoji = isOnlyEmojis(message.content);
    const emojiCount = countEmojis(message.content);
    const messageIsChatAcronym = isChatAcronym(message.content);


    return (
        <>
            {message.attachmentUrl && <div className="flex items-end justify-end mb-2">
                <RenderFileType url={message.attachmentUrl} />
            </div>}
            <div
                className="flex items-end justify-end gap-2 w-full group"
            >
                {!isEmoji ? (
                    messageIsChatAcronym ? <div
                        className="font-bold uppercase max-sm:-mb-2.5"
                        style={{
                            fontSize: "32px"
                        }}
                    >
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
                    <div
                        className={clsx(
                            "md:max-w-1/2 max-w-[100%]",
                            "z-10 relative",
                            emojiCount > 1 ? "" : "-mb-5 max-sm:-mb-9"
                        )}
                        style={{
                            fontSize: emojiCount > 1 ? "32px" : "90px"
                        }}
                    >
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

const RenderFileType = ({ url }: { url: string }) => {
    const playSwingSound = useSoundEffect('/audio/press.mp3', { volume: 0.25, preload: true });
    const [status, startDownload] = useFileDownload();

    // Video player specific states
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [isHovering, setIsHovering] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        playSwingSound.play();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        playSwingSound.play();

        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const changePlaybackSpeed = () => {
        playSwingSound.play();

        const speeds = [0.5, 1, 1.5, 2];
        const currentIndex = speeds.indexOf(playbackSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;

        if (videoRef.current) {
            videoRef.current.playbackRate = speeds[nextIndex];
            setPlaybackSpeed(speeds[nextIndex]);
        }
    };

    if (url.endsWith(".pdf")) {
        return (
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
                            if (!url) return;
                            if (status === 'downloading') return;
                            playSwingSound.play();
                            startDownload(url);
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
        )
    }

    if (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov")) {
        return (
            <div
                className="border-white/20 bg-white/5 rounded-2xl max-h-52 max-w-80 max-sm:max-w-full overflow-hidden p-2"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <video
                        ref={videoRef}
                        src={url}
                        className="w-full h-full object-cover"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)}
                    />

                    {/* Controls overlay */}
                    <div className={clsx(
                        "absolute inset-0 flex flex-col justify-between bg-black/30 transition-opacity duration-300",
                        (isHovering || !isPlaying) ? "opacity-100" : "opacity-0"
                    )}>
                        {/* Center play button */}
                        <div className="flex-1 grid place-items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <button
                                onClick={togglePlay}
                                className="h-12 w-12 rounded-full bg-white/80 grid place-items-center hover:bg-white transition-colors cursor-pointer"
                            >
                                {isPlaying ?
                                    <FaPause className="text-blue-600 text-xl" /> :
                                    <FaPlay className="text-blue-600 text-xl ml-1" />
                                }
                            </button>
                        </div>

                        {/* Bottom controls */}
                        <div className="px-3 py-2 flex justify-between items-center absolute bottom-0 left-0 w-full">
                            <button
                                onClick={toggleMute}
                                className="h-8 w-8 rounded-full bg-white/70 grid place-items-center hover:bg-white/90 transition-colors cursor-pointer"
                                title={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ?
                                    <FaVolumeMute className="text-black text-sm" /> :
                                    <FaVolumeUp className="text-black text-sm" />
                                }
                            </button>

                            <button
                                onClick={changePlaybackSpeed}
                                className="h-6 min-w-6 px-2 bg-white/70 grid place-items-center hover:bg-white/90 transition-colors cursor-pointer rounded-md"
                                title="Change playback speed"
                            >
                                <span className="text-black text-xs font-medium">
                                    {playbackSpeed}x
                                </span>
                            </button>
                        </div>
                        <div className="px-3 py-2 flex justify-between items-center absolute top-0 left-0 w-full">
                            <span></span>
                            <button
                                onClick={()=> {
                                    if (status === 'downloading') return;
                                    playSwingSound.play();
                                    startDownload(url);
                                }}
                                className="h-8 w-8 rounded-full bg-white/70 grid place-items-center hover:bg-white/90 transition-colors cursor-pointer"
                                title={status === 'downloading' ? "Downloading" : "Download"}
                            >
                                {status === 'downloading' ? <FaSpinner className="text-blue-500 text-2xl animate-spin" /> : <FaArrowDown className="text-blue-500" />}   
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="gap-2 w-40 max-sm:max-w-full h-52 rounded-2xl border border-white/20 bg-white/5 grid place-items-center relative overflow-hidden">
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
                        if (!url) return;
                        if (status === 'downloading') return;
                        playSwingSound.play();
                        startDownload(url);
                    }}
                >
                    {status === 'downloading' ? <FaSpinner className="text-blue-500 text-2xl animate-spin" /> : <FaArrowDown className="text-blue-500" />}
                </button>
            </div>
            <Image
                src={url || ''}
                alt="Attachment"
                width={100}
                height={100}
                className="w-full h-full object-cover"
            />
        </div>
    )
}