import { ServerState } from '@/types/useServerStore.type';
import { create } from 'zustand';


export const useServerStore = create<ServerState>((set) => ({
    server: null,
    user: null,
    error: null,
    activeUsers: [],
    currentlyChatting: null,
    isOwner: false,
    isLoading: true,
    setServer: (server) => set({ server, error: null }),
    setIsOwner: (state) => set({
        isOwner: state
    }),
    setUser: (user) => set({ user }),
    setError: (error) => set({ error, server: null }),
    setLoading: (isLoading) => set({ isLoading }),
    setActiveUsers: (users) => set({ activeUsers: users }),
    addActiveUser: (user) => set(state => ({ activeUsers: [...state.activeUsers, user] })),
    removeActiveUser: (userId) => set(state => ({ activeUsers: state.activeUsers.filter(user => user.userId !== userId) })),
    clearServer: () => set({
        server: null,
        user: null,
        error: null,
        activeUsers: [],
        currentlyChatting: null,
        isLoading: false
    }),
    setCurrentlyChatting: (user) => set({ currentlyChatting: user })
}));
