export interface CreateServerRequest {
    serverName: string;
    encryptionKey: string;
    lifeSpan: number;
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