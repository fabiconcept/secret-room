import { ServerMetadata } from '@/utils/Metadatas/Index';

export const metadata = ServerMetadata;

export default function ServerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    )
}