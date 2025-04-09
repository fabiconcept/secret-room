import { ServerResponse, ServerUser } from '@/app/types/server.types';
import { Message } from '.';

export interface User {
    userId: string;
    username: string;
    token: string;
}


export interface ServerState {
    server: ServerResponse | null;
    user: User | null;
    isOwner: boolean;
    activeUsers: ServerUser[];
    error: string | null;
    isLoading: boolean;
    currentlyChatting: ServerUser | null;
    messages: Message[];
    addMessage: (message: Message) => void;
    populateMessages: (messages: Message[]) => void;
    setIsOwner: (state: boolean) => void;
    setServer: (server: ServerResponse) => void;
    setUser: (user: User) => void;
    setActiveUsers: (users: ServerUser[]) => void;
    addActiveUser: (user: ServerUser) => void;
    removeActiveUser: (userId: string) => void;
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
    clearServer: () => void;
    setCurrentlyChatting: (user: ServerUser) => void;
}
