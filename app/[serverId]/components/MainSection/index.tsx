"use client"
import { useServerStore } from "@/store/useServerStore";
import Header from "./Header";
import ChatBox from "./ChatBox";
import ChatSection from "./Chats/Index";

export default function MainSection() {
    const { server } = useServerStore();

    return (
        <section className="flex-1 h-full flex flex-col">
            <Header />
            <ChatSection />
            <ChatBox />
        </section>
    )
}
