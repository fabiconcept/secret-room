import { formatDistanceToNow } from 'date-fns';

interface UserCardProps {
    username: string;
    isOnline: boolean;
    lastSeen: Date;
}

export default function UserCard({ username, isOnline, lastSeen }: UserCardProps) {
    return (
    <div className="flex items-center gap-3 px-4 py-1 hover:bg-white/2 transition-colors cursor-pointer">
        <div className="relative">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                {username[0].toUpperCase()}
            </div>
            <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-black/20 ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
        </div>
        <div className="flex-1">
            <h3 className="text-white font-medium">{username}</h3>
            {!isOnline && (
                <p className="text-xs text-gray-400">
                    Last seen {formatDistanceToNow(new Date(lastSeen))} ago
                </p>
            )}
        </div>
    </div>
    );
}