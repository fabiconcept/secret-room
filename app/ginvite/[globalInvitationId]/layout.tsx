import { GlobalInviteMetadata } from '@/utils/Metadatas/Index';

export const metadata = GlobalInviteMetadata;

export default function GlobalInviteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    )
}