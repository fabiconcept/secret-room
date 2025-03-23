import { ServerResponse, ServerUser } from '@/app/types/server.types';

interface User {
    userId: string;
    username: string;
    token: string;
}

export interface ServerState {
    server: ServerResponse | null;
    user: User | null;
    isOwner: boolean;
    setIsOwner: (state: boolean) => void;
    activeUsers: ServerUser[];
    error: string | null;
    isLoading: boolean;
    setServer: (server: ServerResponse) => void;
    setUser: (user: User) => void;
    setActiveUsers: (users: ServerUser[]) => void;
    addActiveUser: (user: ServerUser) => void;
    removeActiveUser: (userId: string) => void;
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
    clearServer: () => void;
    currentlyChatting: User | null;
    setCurrentlyChatting: (user: User) => void;
}
