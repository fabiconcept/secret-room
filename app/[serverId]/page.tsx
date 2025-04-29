'use client';

import { useEffect, useState } from "react";
import { apiService } from "@/utils/services/api.service";
import TypeWriter from "../components/TypeWriter";
import ServerProvider from "./components/ServerProvider";
import ChatSection from "./components";
import { getItem, setItem } from "@/utils/localStorage";
import { redirect, useParams } from "next/navigation";
import { ServerResponse } from "@/app/types/server.types";

export default function Page() {
    const { serverId } = useParams();
    const [server, setServer] = useState<ServerResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServer = async () => {
            const authFallback = {
                userId: '',
                token: ''
            };
            const auth = getItem<typeof authFallback>(serverId as string, authFallback);
    
            try {
                setIsLoading(true);
    
                if (!auth.userId || !auth.token) {
                    redirect('/');
                }
    
                const { data: serverData } = await apiService.getServer(serverId as string, auth.userId, auth.token);
                setServer(serverData);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to fetch server';
                if (errorMessage.toLowerCase().includes('token has expired')) {
                    try {
                        const { data: refreshTokenData } = await apiService.refreshToken({ 
                            userId: auth.userId, 
                            serverId: serverId as string 
                        });
                        
                        if (refreshTokenData?.token) {
                            setItem(serverId as string, {
                                userId: auth.userId,
                                token: refreshTokenData.token
                            });
                            
                            // Make a new request with updated token instead of recursion
                            const { data: serverData } = await apiService.getServer(
                                serverId as string, 
                                auth.userId, 
                                refreshTokenData.token
                            );
                            setServer(serverData);
                            return; // Exit the error handler after successful recovery
                        } else {
                            // Token refresh returned invalid data
                            throw new Error('Unable to refresh session');
                        }
                    } catch (refreshError) {
                        setError('An error occurred while refreshing the session. Please try again later.');
                        setTimeout(() => {
                            redirect('/');
                        }, 3000);
                        
                        throw refreshError;
                    }
                }
                setError(errorMessage);
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
            <div className="grid place-items-center min-h-dvh w-screen">
                <div 
                    className="h-dvh w-screen sm:rounded-3xl overflow-hidden border border-gray-500/20 sm:max-h-[calc(100vh-20px)] sm:max-w-[calc(100vw-20px)]">
                    <ChatSection />
                </div>
            </div>
        </ServerProvider>
    );
}