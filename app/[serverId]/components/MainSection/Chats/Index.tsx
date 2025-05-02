"use client";   

import { useRef, useEffect, useState } from "react";
import FromSender from "./FromSender";
import FromMe from "./FromMe";
import { FaAngleDoubleDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useServerStore } from "@/store/useServerStore";

export default function ChatSection() {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const { messages, server, currentlyChatting, user, activeUsers, typingUsers } = useServerStore();

    // Function to scroll to bottom
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    // Check scroll position to show/hide button
    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            // Show button if scrolled up more than 50px from bottom
            const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
            setShowScrollButton(distanceFromBottom > 500);
        }
    };

    // Scroll to bottom when messages change only if user is near bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            if (!user) return;
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
            
            // Only scroll to bottom automatically if user is within 30px of bottom
            if (distanceFromBottom <= 100 || messages[messages.length - 1].senderId === user.userId) {
                scrollToBottom();
            }
        }
        handleScroll();
    }, [messages]);

    // Add resize listener
    useEffect(() => {
        scrollToBottom();
        
        const handleResize = () => {
            handleScroll();
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!server) return null;
    if (!currentlyChatting) return null;
    if (!user) return null;

    // Animation variants for new messages
    const messageVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0,
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                type: "spring", 
                stiffness: 5000, 
                damping: 50,
                mass: 0.8,
                velocity: 0,
                duration: 0.05
            }
        }
    };

    const relevantMessages = Array.from(
        new Map(
            messages
                .filter(({ senderId, receiverId }) =>
                    (senderId === user.userId && receiverId === currentlyChatting.userId) ||
                    (senderId === currentlyChatting.userId && receiverId === user.userId)
                )
                .map(message => [`${message.senderId}-${message.createdAt}`, message])
        ).values()
    ).map((messages)=> {
        const messageWithUsername = {
            ...messages,
            username: activeUsers.find(user => user.userId === messages.senderId)?.username || "Unknown"
        };
        return messageWithUsername;
    });

      
    return (
        <div className="flex-1 flex flex-col relative overflow-hidden">
            {relevantMessages.length === 0 && <p className="text-gray-300 text-sm text-center p-5">
                {typingUsers.includes(currentlyChatting.userId) ? <span className="px-4 py-1 bg-white/10 rounded-full border border-gray-500/40 animate-pulse">Typing...</span> : <span className="px-4 py-1 bg-white/10 rounded-full border border-gray-500/40">Start a conversation</span>}
            </p>}
            {relevantMessages.length > 0 && <div 
                ref={chatContainerRef} 
                className="flex-1 flex flex-col gap-3 max-sm:gap-5 overflow-y-auto w-full p-3"
                onScroll={handleScroll}
            >
                {relevantMessages.map((message) => {
                    // Is this message from someone else (not the current user)?
                    const isFromSender = message.senderId !== user.userId;

                    if (isFromSender) {
                        // From sender and not read yet - animate it
                        if (!message.readByReceiver) {
                            return (
                                <motion.div
                                    key={`${message.senderId}-${message.createdAt}`}
                                    initial="hidden"
                                    animate="visible"
                                    variants={messageVariants}
                                    layout
                                >
                                    <FromSender 
                                        message={{
                                            content: message.content,
                                            read: message.readByReceiver,
                                            messageId: message.messageId,
                                            username: message.username,
                                            attachmentUrl: message.attachmentUrl
                                        }}
                                    />
                                </motion.div>
                            );
                        }
                        // From sender but already read - no animation
                        else {
                            return (
                                <div key={`${message.senderId}-${message.createdAt}`}>
                                    <FromSender 
                                        message={{
                                            content: message.content,
                                            read: message.readByReceiver,
                                            messageId: message.messageId,
                                            username: message.username,
                                            attachmentUrl: message.attachmentUrl
                                        }}
                                    />
                                </div>
                            );
                        }
                    }

                    // From current user - always no animation
                    return (
                        <div key={`${message.senderId}-${message.createdAt}`}>
                            <FromMe 
                                message={{ content: message.content, read: message.readByReceiver, username: message.username, attachmentUrl: message.attachmentUrl, sent: message.sent }}
                            />
                        </div>
                    );
                })}
                {typingUsers.includes(currentlyChatting.userId) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 p-3"
                    >
                        <p className="text-sm font-semibold uppercase text-orange-500/30"><p data-text="They're trash taking..." className="glitch animate-pulse">User is typing a message...</p></p>
                    </motion.div>
                )}
            </div>}
            
            <AnimatePresence>
                {showScrollButton && (
                    <motion.div 
                        onClick={scrollToBottom}
                        className="absolute left-1/2 bottom-3 -translate-x-1/2 z-10 px-3 text-sm py-3 rounded-4xl bg-blue-600 text-white cursor-pointer active:scale-95 flex items-center gap-1 hover:bg-blue-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaAngleDoubleDown className="text-white" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}