"use client"
import { useServerStore } from "@/store/useServerStore";
import Header from "./Header";
import ChatBox from "./ChatBox";
import ChatSection from "./Chats/Index";

export default function MainSection() {
    const { server, currentlyChatting } = useServerStore();

    if (!server) return null;

    return (
        <section className="flex-1 h-full flex flex-col">
            {currentlyChatting && (
                <>
                    <Header />
                    <ChatSection />
                    <ChatBox />
                </>
            )}
        </section>
    )
}
