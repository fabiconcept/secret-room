"use client";

import { useServerStore } from "@/store/useServerStore";

export default function SideBar() {
    const { server, activeUsers } = useServerStore();
    return (
        <section className="flex flex-col w-[clamp(20rem,100%,25rem)] h-full bg-black/20 border-r border-b border-white/10">
            <header className={"w-full p-10 text-center text-white text-xl font-semibold bg-black/5 backdrop-blur-[2px]"}>
                <span className="glitch" data-text={`${server?.server_name} Server`}>{server?.server_name} Server</span>
            </header>
            <div className="flex-1 w-full overflow-y-auto">
                {JSON.stringify(activeUsers)}
            </div>
        </section>
    )
}
