'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiService } from '@/utils/services/api.service';
import { getUniqueFingerprint } from '@/utils';
import { getItem, setItem } from '@/utils/localStorage';
import { Auth } from '@/app/types/index.type';
import TypeWriter from '@/app/components/TypeWriter';

export default function UniqueInvitationPage() {
    const params = useParams();
    const router = useRouter();
    const [status, setStatus] = useState<{
        message: string;
        subMessage: string;
        isError: boolean;
        serverId?: string;
    } | null>(null);

    useEffect(() => {
        const joinServer = async () => {
            try {
                const uniqueInvitationId = params?.uniqueInvitationId as string;
                if (!uniqueInvitationId) {
                    throw new Error('Invalid invitation link');
                }

                setStatus({
                    message: "Joining Server",
                    subMessage: "Generating secure device ID...",
                    isError: false
                });

                // Get device fingerprint
                const fingerprint = await getUniqueFingerprint();

                setStatus({
                    message: "Joining Server",
                    subMessage: "Verifying invitation...",
                    isError: false
                });

                // Try to join server
                const response = await apiService.getServerByUniqueInvitation(uniqueInvitationId, fingerprint);

                // Check if user already has auth for this server
                const authFallback = { userId: '', username: '', token: '' };
                const auth = getItem<Auth>(response.data.serverId, authFallback);

                // Only save new auth if none exists
                if (!auth.userId || !auth.username || !auth.token) {
                    setItem(response.data.serverId, {
                        userId: response.user.userId,
                        username: response.user.username,
                        token: response.token
                    });
                }

                setStatus({
                    message: "Server Joined Successfully",
                    subMessage: "Opening server...",
                    isError: false,
                    serverId: response.data.serverId
                });

                // Auto redirect to server
                setTimeout(() => router.push(`/${response.data.serverId}`), 1500);

            } catch (error: any) {
                const message = error.message || 'This invitation link is no longer valid.';
                const isConflict = message.includes('server_');
                const serverId = isConflict ? message.split('server_')[1] : undefined;

                setStatus({
                    message: isConflict ? "Already In Server" : "Invalid Invitation",
                    subMessage: isConflict ? 'Opening your existing session...' : 'Redirecting to home page...',
                    isError: true,
                    serverId
                });

                // Redirect based on error type
                setTimeout(() => {
                    router.push(isConflict ? `/${serverId}` : '/');
                }, 2000);
            }
        };

        joinServer();
    }, [params, router]);

    if (!status) {
        return (
            <div className="h-screen w-screen grid place-items-center relative z-10">
                <div className="w-[clamp(20rem,100%,40rem)] p-10 bg-[#1a1a1a] rounded-xl">
                    <h1 className="text-3xl text-center">Loading...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen grid place-items-center relative z-10">
            <div className="w-[clamp(20rem,100%,40rem)] p-10 bg-[#1a1a1a] rounded-xl">
                <h1 className="text-3xl text-center glitch" data-text={status.message}>
                    {status.message}
                </h1>
                <TypeWriter
                    text={status.subMessage}
                    className={`${status.isError ? 'text-red-500' : 'text-green-500'} my-5 text-lg opacity-70 text-center animate-pulse glitch`}
                    speed={40}
                    shouldRedirect={false}
                />
            </div>
        </div>
    );
}
