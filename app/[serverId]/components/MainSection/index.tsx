"use client"
import { useServerStore } from "@/store/useServerStore";
import Link from "next/link";

export default function MainSection() {
    const { server } = useServerStore();

    return (
        <section className="flex-1 h-full flex flex-col">
            <Link href={`/ginvite/${server?.global_invitation_id}`}>{server?.global_invitation_id}</Link>
            <span>Lorem ipsum dolor sit amet.</span>
        </section>
    )
}
