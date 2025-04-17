"use client";

import { useServerStore } from "@/store/useServerStore";
import { Message } from "@/types";
import useSoundEffect from "@/utils/Hooks/useSoundEffect";
import SirvClient from "@/utils/services/sirv.service";
import { socketService } from "@/utils/services/socket.service";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPaperclip, FaSpinner, FaX } from "react-icons/fa6";

export default function ChatBox() {
    const { currentlyChatting, server, user } = useServerStore();
    const [message, setMessage] = useState('');
    const [attachFile, setAttachFile] = useState<File | null>(null);

    const playClickSound = useSoundEffect('/audio/click.mp3', { volume: 0.25, preload: true });
    const playSwingSound = useSoundEffect('/audio/swing.mp3', { volume: 0.5, preload: true });
    const playPopUpSound = useSoundEffect('/audio/pop-up.mp3', { volume: 0.5, preload: true });
    const playCloseSound = useSoundEffect('/audio/close.mp3', { volume: 0.5, preload: true });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const textInputRef = useRef<HTMLTextAreaElement>(null);

    const [isUploading, setIsUploading] = useState(false);

    const handleSend = async () => {
        if (!server) return null;
        if (!user) return null;
        if (!currentlyChatting) return null;
        if (isUploading) return null;

        console.log("message")

        
        if (message.trim() !== '') {
            setMessage('');
            playSwingSound.play();
            const sirv = new SirvClient();

            const payload: Omit<Message, 'messageId'> = {
                serverId: server.server_id,
                senderId: user.userId,
                receiverId: currentlyChatting?.userId || '',
                content: message.trim().length > 0 ? message.trim() : '',
                createdAt: new Date(),
                readBySender: true,
                readByReceiver: false,
                sent: true
            }

            if (attachFile) {
                setIsUploading(true);
                try {
                    const attachmentUrl = await sirv.uploadAttachment(attachFile);
                    payload.attachmentUrl = attachmentUrl;
                } catch (error) {
                    toast.error('Failed to upload attachment');
                    return;
                } finally {
                    setAttachFile(null);
                    setIsUploading(false);
                }
            }

            console.log("payload", payload);

            socketService.emitNewMessage(payload);
        }
    };

    const handleFileChange = (e: FileList | null) => {
        if (!e) {
            toast.error("Please select a valid file!");
            return;
        }
        

        const file = e[0];
        const maxSize = 10 * 1024 * 1024;
        const acceptableFileTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif"]

        if (file.size > maxSize) {
            toast.error("File is too large!");
            return;
        }

        if (!acceptableFileTypes.includes(file.type)) {
            toast.error("This file is not supported!")
            return;
        }

        textInputRef.current?.focus();
        playPopUpSound.play();

        setAttachFile(file);
    }

    useEffect(()=>{
        if(!textInputRef.current) return; 
        textInputRef.current.focus();
    }, [textInputRef])

    return (
        <div className="flex items-end md:p-5 p-3 pt-0 bg-white/5 border-t border-gray-500/20">
            <div className="flex flex-1 gap-3 relative">
                <AnimatePresence>
                    {attachFile && !isUploading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 20 }}
                            transition={{
                                duration: 0.05,
                                ease: "easeOut"
                            }}
                            className="absolute -top-24 text-sm left-3 h-20 w-16 p-1 rounded-lg border border-gray-500/20 bg-white/5">
                            {attachFile.type.startsWith('image') ? (
                                <img src={URL.createObjectURL(attachFile)} alt="" className="w-full h-full object-cover cursor-pointer" />
                            ) : (
                                <div className="w-full h-full flex items-center gap-1 flex-col bg-red-500/25 cursor-pointer rounded-lg justify-center">
                                    <FaPaperclip className="text-white" />
                                    <span className="text-white text-xs">PDF</span>
                                </div>
                            )}
                            <button 
                                className="absolute -top-1 -right-1 bg-red-500/50 p-1 rounded-full border border-red-500/10 hover:bg-red-500 hover:text-white cursor-pointer active:scale-90 text-white" 
                                title="Remove attachment" 
                                onClick={() => {
                                    setAttachFile(null);
                                    playCloseSound.play();
                                }}
                            >
                                <FaX className="text-white text-xs" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <textarea
                    placeholder="Send a message..."
                    className="flex-1 bg-white/5 border border-gray-500/20 rounded-3xl px-5 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 resize-none field-sizing-content max-h-32"
                    rows={1}
                    value={message}
                    onChange={(e) => {
                        playClickSound.play();
                        setMessage(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    ref={textInputRef}
                />

                <button 
                    className="bg-white/5 border aspect-square grid place-items-center border-gray-500/20 rounded-3xl h-10 cursor-pointer hover:bg-white/10 hover:border-white/40 active:scale-90 absolute right-1.5 top-1/2 -translate-y-1/2"
                    title="Attach a file"
                    onClick={() => {
                        playSwingSound.play();
                        fileInputRef.current?.click()
                    }}
                >
                    <FaPaperclip className="text-white" />
                    <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e.target.files)}
                        ref={fileInputRef}
                    />
                </button>
            </div>

            <div className={clsx(
                "flex flex-col gap-5 h-full overflow-hidden",
                message.trim() === '' || isUploading ? "opacity-30" : ""
            )}>
                <div className="flex-1 w-10 border-t border-r border-gray-500 relative top-6 left-6 rounded-tr-4xl" />
                <button
                    onClick={handleSend}
                    className={clsx(
                        "ml-3 z-10 border border-gray-500/20 rounded-full px-8",
                        message.trim() === '' || isUploading ? 'bg-gray-500 cursor-not-allowed' : 'cursor-pointer bg-green-600 hover:bg-green-500 active:scale-90 hover:border-white/20'
                    )}>
                    {isUploading ? <FaSpinner className="text-white animate-spin text-5xl py-2"/> : <p className="py-3">Send</p>}
                </button>
            </div>
        </div>
    )
}