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

    const { messages, server, currentlyChatting, user } = useServerStore();
    if (!server) return null;
    if (!currentlyChatting) return null;
    if (!user) return null;

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
            setShowScrollButton(distanceFromBottom > 50);
        }
    };

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
        handleScroll();
    }, [messages]);

    // Add resize listener
    useEffect(() => {
        const handleResize = () => {
            handleScroll();
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
    );
      
      
    return (
        <div className="flex-1 flex flex-col relative overflow-hidden">
            <div 
                ref={chatContainerRef} 
                className="flex-1 flex flex-col gap-3 overflow-y-auto w-full p-3"
                onScroll={handleScroll}
            >
                {relevantMessages.map((message) => (
                    !message.read ? (
                        <motion.div
                            key={`${message.senderId}-${message.createdAt}`}
                            initial="hidden"
                            animate="visible"
                            variants={messageVariants}
                            layout
                        >
                            {message.senderId !== user.userId ? <FromSender message={message.content} /> : <FromMe message={message.content} />}
                        </motion.div>
                    ) : (   
                        <div key={`${message.senderId}-${message.createdAt}`}>
                            {message.senderId !== user.userId ? <FromSender message={message.content} /> : <FromMe message={message.content} />}
                        </div>
                    )
                ))}
            </div>
            
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