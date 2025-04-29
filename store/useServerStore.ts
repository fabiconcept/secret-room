import { ServerState } from "@/types/useServerStore.type";
import { create } from "zustand";


export const useServerStore = create<ServerState>((set) => ({
    server: null,
    user: null,
    error: null,
    typingUsers: [],
    activeUsers: [],
    currentlyChatting: null,
    isOwner: false,
    isLoading: true,
    messages: [],
    addMessage: (message) => set(state => ({ messages: [...state.messages, message] })),
    populateMessages: (messages) => set({ messages }),
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
    setCurrentlyChatting: (user) => set({ currentlyChatting: user }),
    removeCurrentlyChatting: () => set({ currentlyChatting: null }),
    onMessageRead: (messageId) => set(state => ({ messages: state.messages.map(message => message.messageId === messageId ? { ...message, readByReceiver: true } : message) })),
    addTypingUser: (userId) => set(state => ({
        typingUsers: [...new Set([...state.typingUsers, userId])]
    })),
    removeTypingUser: (userId) => set(state => ({ typingUsers: state.typingUsers.filter(user => user !== userId) })),
}));
