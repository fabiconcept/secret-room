import { io, Socket } from 'socket.io-client';

interface ServerMessage {
    type: 'status' | 'error';
    content: string;
    timestamp: number;
}

interface ServerToClientEvents {
    'server_message': (message: ServerMessage) => void;
    'server_error': (message: ServerMessage) => void;
    'server_joined': (message: ServerMessage) => void;
    'server_left': (message: ServerMessage) => void;
    'server_action': (message: ServerMessage) => void;
}

interface ClientToServerEvents {
    'join_server': (payload: { serverId: string; apiKey: string }) => void;
    'leave_server': (serverId: string) => void;
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
            this.socket = io(this.baseUrl, {
                transports: ['websocket'],
                autoConnect: false,
                auth: {
                    token
                }
            });

            this.currentServerId = serverId;
            this.setupEventListeners();
            this.socket.connect();

            // Join server with credentials
            this.socket.emit('join_server', {
                serverId,
                apiKey: token
            });

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

        // Connection events
        this.socket.on('connect', () => {
            console.log('Socket connected:', this.socket?.id);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
            this.currentServerId = null;
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            this.currentServerId = null;
        });

        // Server events
        this.socket.on('server_message', (message) => {
            console.log('Server message:', message);
        });

        this.socket.on('server_error', (message) => {
            console.error('Server error:', message);
        });

        this.socket.on('server_joined', (message) => {
            console.log('Server joined:', message);
        });

        this.socket.on('server_left', (message) => {
            console.log('Server left:', message);
        });

        this.socket.on('server_action', (message) => {
            console.log('Server action:', message);
        });
    }

    public onServerMessage(callback: (message: ServerMessage) => void): void {
        this.socket?.on('server_message', callback);
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

    public removeAllListeners(): void {
        if (!this.socket) return;
        this.socket.removeAllListeners();
        this.setupEventListeners(); // Maintain core event listeners
    }

    public isConnected(): boolean {
        return this.socket?.connected || false;
    }
}

// Export singleton instance
export const socketService = SocketService.getInstance();
