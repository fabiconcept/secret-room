'use client';

import { useEffect, useState } from "react";
import { apiService } from "@/utils/services/api.service";
import TypeWriter from "../components/TypeWriter";
import ServerProvider from "./components/ServerProvider";
import ChatSection from "./components";
import { getItem } from "@/utils/localStorage";
import { redirect, useParams } from "next/navigation";

export default function Page() {
    const { serverId } = useParams();
    const [server, setServer] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServer = async () => {
            try {
                setIsLoading(true);
                const authFallback = {
                    userId: '',
                    username: '',
                    token: ''
                };
                const auth = getItem<any>(serverId as string, authFallback);

                console.log({
                    auth
                })

                if (!auth.userId || !auth.token) {
                    redirect('/');
                }

                const { data: serverData } = await apiService.getServer(serverId as string, auth.userId, auth.token);
                setServer(serverData);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch server');
                setTimeout(() => {
                    redirect('/');
                }, 3000);
            } finally {
                setIsLoading(false);
            }
        };

        if (serverId) {
            fetchServer();
        }
    }, [serverId]);

    if (isLoading) {
        return (
            <div className="h-screen w-screen grid place-items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen w-screen grid place-items-center relative z-10">
                <div className="w-[clamp(20rem,100%,40rem)] p-10 bg-[#1a1a1a] rounded-xl">
                    <h1 className="text-xl text-center glitch" data-text={"Something went wrong."}>
                        Oops! An error has occurred.
                    </h1>
                    <TypeWriter
                        text={`${error}\n\nRedirecting to home...`}
                        className="text-red-500 my-5 text-lg opacity-70 text-center animate-pulse glitch"
                        speed={40}
                    />
                </div>
            </div>
        );
    }

    if (!server) return null;

    return (
        <ServerProvider server={server}>
            <div className="h-screen w-screen">
                <ChatSection />
            </div>
        </ServerProvider>
    );
}