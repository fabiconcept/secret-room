export interface CreateServerRequest {
    serverName: string;
    encryptionKey: string;
    lifeSpan: number;
    fingerprint: string;
}

export interface ServerResponse {
    server_name: string;
    server_id: string;
    expiration: Date;
    global_invitation_id: string;
    owner: string;
}

export interface ApiResponse<T> {
    message: string;
    data: T;
}

export interface CreateServerResponse<T> extends ApiResponse<T> {
    user: {
        userId: string,
        username: string
    },
    token: string
}

export interface InviteServerResponse<T> extends ApiResponse<T> {
    user: {
        userId: string,
        username: string
    },
    token: string
}

export interface ServerUser {
    userId: string;
    username: string;
}

export interface ServerInviteData {
    serverId: string;
    serverName: string;
    expiresAt: string;
}