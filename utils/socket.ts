import { io, Socket } from 'socket.io-client';

// Define the server URL - this should match your server configuration
const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:3001';

// Create a singleton socket instance
export const socket: Socket = io(SOCKET_SERVER_URL, {
    autoConnect: false, // Don't connect automatically - we'll connect when needed
    reconnection: true, // Enable reconnection
    reconnectionAttempts: 5, // Try to reconnect 5 times
    reconnectionDelay: 1000, // Start with 1 second delay between attempts
    timeout: 10000, // Connection timeout in milliseconds
});

// Helper function to initialize socket connection
export const initializeSocket = () => {
    if (!socket.connected) {
        socket.connect();
    }
};

// Helper function to disconnect socket
export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};

// Export a custom hook for components to easily use socket.io
export const useSocket = () => {
    return {
        socket,
        initializeSocket,
        disconnectSocket,
    };
};
