import { io, Socket } from 'socket.io-client';
import { getItem } from '../localStorage';
import { Auth } from '@/app/types/index.type';
import { ServerMessage, ServerUser } from '@/app/types/server.types';
import { Message } from '@/types';

interface ServerToClientEvents {
    'server_message': (message: ServerMessage) => void;
    'new-message': (message: Message) => void;
    'server_error': (message: ServerMessage) => void;
    'server_joined': (message: ServerMessage) => void;
    'server_left': (message: ServerMessage) => void;
    'message_read': (messageId: string) => void;
    'server_action': (message: ServerMessage) => void;
    'active_users_updated': (users: ServerUser[]) => void;
    'server_deleted': () => void;
    'user_status_changed': (update: { userId: string; isOnline: boolean }) => void;
    'user_typing': (payload: {userId: string, typing: boolean, typingTo: string}) => void;
}

interface ClientToServerEvents {
    'join_server': (payload: { serverId: string; userId: string }) => void;
    'leave_server': (serverId: string) => void;
    'new-message': (serverId: string, message: Omit<Message, 'messageId'>) => void;
    'mark_message_read': (messageId: string) => void;
    'typing': (serverId: string, receiverId: string, userId: string) => void;
    'not_typing': (serverId: string, userId: string) => void;
}

class SocketService {
    private static instance: SocketService;
    private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
    private readonly baseUrl: string = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || '';
    private currentServerId: string | null = null;

    private constructor() { }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public connect(serverId: string, token: string): void {
        if (this.socket?.connected && this.currentServerId === serverId) {
            console.warn('Already connected to this server');
            return;
        }

        // If connected to a different server, disconnect first
        if (this.socket?.connected && this.currentServerId !== serverId) {
            this.disconnect(this.currentServerId!);
        }

        try {
            // Get user info from local storage
            const authFallback = { userId: '', username: '', token: '' };
            const auth = getItem<Auth>(serverId, authFallback);

            if (!auth.userId) {
                throw new Error('User ID not found');
            }

            this.socket = io(this.baseUrl, {
                query: { token },
                transports: ['websocket'],
                autoConnect: true
            });

            this.currentServerId = serverId;

            this.socket.on('connect', () => {
                if (this.socket) {
                    this.socket.emit('join_server', {
                        serverId,
                        userId: auth.userId
                    });
                }
            });

            this.socket.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
            });

            this.setupEventListeners();
        } catch (error) {
            console.error('Socket connection error:', error);
            throw error;
        }
    }

    public disconnect(serverId: string): void {
        if (!this.socket || this.currentServerId !== serverId) {
            console.warn('No active connection to this server');
            return;
        }

        try {
            this.socket.emit('leave_server', serverId);
            this.socket.disconnect();
            this.socket = null;
            this.currentServerId = null;
        } catch (error) {
            console.error('Socket disconnection error:', error);
            throw error;
        }
    }

    private setupEventListeners(): void {
        if (!this.socket) return;

        this.socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
            this.currentServerId = null;
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            this.currentServerId = null;
        });
    }

    public onServerMessage(callback: (message: ServerMessage) => void): void {
        this.socket?.on('server_message', callback);
    }

    public onNewMessage(callback: (message: Message) => void): void {
        this.socket?.on('new-message', callback);
    }

    public onMessageRead(callback: (messageId: string) => void): void {
        console.log('onMessageRead callback registered')
        this.socket?.on('message_read', callback);
    }

    public onServerError(callback: (message: ServerMessage) => void): void {
        this.socket?.on('server_error', callback);
    }

    public onServerJoined(callback: (message: ServerMessage) => void): void {
        this.socket?.on('server_joined', callback);
    }

    public onServerLeft(callback: (message: ServerMessage) => void): void {
        this.socket?.on('server_left', callback);
    }

    public onServerAction(callback: (message: ServerMessage) => void): void {
        this.socket?.on('server_action', callback);
    }

    public onActiveUsersUpdated(callback: (users: ServerUser[]) => void): void {
        this.socket?.on('active_users_updated', callback);
    }

    public onUserStatusChanged(callback: (update: { userId: string; isOnline: boolean }) => void): void {
        this.socket?.on('user_status_changed', callback);
    }

    public onServerDeleted(callback: () => void): void {
        this.socket?.on('server_deleted', callback);
    }

    public onUserTyping(callback: (payload: { userId: string, typing: boolean, typingTo: string }) => void): void {
        this.socket?.on('user_typing', callback);
    }

    // Client to Server
    public emitNewMessage(message: Omit<Message, 'messageId'>): void {
        if (!this.socket || !this.currentServerId) return;
        this.socket.emit('new-message', this.currentServerId, message);
    }

    public emitReadMessage(messageId: string): void {
        if (!this.socket || !this.currentServerId) return;
        this.socket.emit('mark_message_read', messageId);
    }

    public emitLeaveServer(): void {
        if (!this.socket || !this.currentServerId) return;
        this.socket.emit('leave_server', this.currentServerId);
    }

    public removeAllListeners(): void {
        if (!this.socket) return;
        this.socket.removeAllListeners();
        this.setupEventListeners(); // Maintain core event listeners
    }

    public emitUserTyping({ serverId, receiverId, userId }: { serverId: string; receiverId: string, userId: string }): void {
        if (!this.socket || !this.currentServerId) return;
        this.socket.emit('typing', serverId, receiverId, userId);
    }

    public emitUserNotTyping({ serverId, userId }: { serverId: string; userId: string }): void {
        if (!this.socket || !this.currentServerId) return;
        this.socket.emit('not_typing', serverId, userId);
    }

    public isConnected(): boolean {
        return this.socket?.connected || false;
    }
}

// Export singleton instance
export const socketService = SocketService.getInstance();
