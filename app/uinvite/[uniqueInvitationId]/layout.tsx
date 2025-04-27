import { PrivateInviteMetadata } from '@/utils/Metadatas/Index';

export const metadata = PrivateInviteMetadata;

export default function PrivateInviteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    )
}