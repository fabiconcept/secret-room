"use client";

import { useServerStore } from "@/store/useServerStore";
import { socketService } from "@/utils/services/socket.service";
import { useState } from "react";

export default function ChatBox() {
    const { currentlyChatting, server, user } = useServerStore();

    const [message, setMessage] = useState('');
    
    const handleSend = () => {
        if (!server) return null;
        if (!user) return null;
        if (!currentlyChatting) return null;
        
        if (message.trim() !== '') {
            setMessage('');
            const payload = {
                serverId: server.server_id,
                senderId: user.userId,
                receiverId: currentlyChatting?.userId || '',
                content: message.trim(),
                createdAt: new Date(),
                read: false
            }

            console.log({
                payload
            })
            socketService.emitNewMessage(payload);
        }
    };
    
    return (
        <div className="flex items-end p-5 pt-0 bg-white/5 border-t border-gray-500/20">
            <textarea
                placeholder="Send a message..."
                className="flex-1 bg-white/5 border border-gray-500/20 rounded-3xl px-5 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 resize-none field-sizing-content max-h-32"
                rows={1} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }}
            />

            <div className="flex flex-col gap-5 h-full overflow-hidden">
                <div className="flex-1 w-10 border-t border-r border-gray-500 relative top-6 left-6 rounded-tr-4xl"/>
                <button
                    onClick={handleSend}
                    className="ml-3 bg-green-600 z-10 border border-gray-500/20 rounded-full px-8 py-3 hover:bg-green-500 active:scale-90 cursor-pointer hover:border-white/20">
                    Send
                </button>
            </div>
        </div>
    )
}