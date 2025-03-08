export interface CreateServerRequest {
    serverName: string;
    encryptionKey: string;
    lifeSpan: number;
}

export interface ServerResponse {
    server_name: string;
    server_id: string;
    expiration: Date;
}

export interface ApiResponse<T> {
    message: string;
    data: T;
}
