import { InviteServerResponse, ApiResponse, CreateServerRequest, ServerResponse, CreateServerResponse, ServerUser, ServerInviteData, ServerMessage } from "@/app/types/server.types";
import { Message } from "@/types";

class ApiService {
    private static instance: ApiService;
    private readonly baseUrl: string = process.env.NEXT_PUBLIC_SERVER_URL || '';
    private readonly apiKey: string = process.env.NEXT_PUBLIC_API_KEY || '';

    private constructor() { }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    private getHeaders(): HeadersInit {
        return {
            'Content-Type': 'application/json',
            'X-API-Key': this.apiKey
        };
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred');
        }

        return response.json();
    }

    public async createServer(request: CreateServerRequest): Promise<CreateServerResponse<ServerResponse>> {
        try {
            if (!this.baseUrl) throw new Error("Missing baseUrl Variable!");

            const response = await fetch(`${this.baseUrl}/server`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(request)
            });

            return this.handleResponse<CreateServerResponse<ServerResponse>>(response);
        } catch (error) {
            console.error('API Error:', error);
            throw this.handleError(error);
        }
    }

    public async getServer(serverId: string, userId: string, token: string): Promise<ApiResponse<ServerResponse>> {
        try {
            if (!this.baseUrl) throw new Error("Missing baseUrl Variable!");

            const response = await fetch(`${this.baseUrl}/server/${serverId}?userId=${userId}`, {
                method: 'GET',
                headers: {
                    ...this.getHeaders(),
                    'Authorization': token
                }
            });

            return this.handleResponse<ApiResponse<ServerResponse>>(response);
        } catch (error) {
            console.error('API Error:', error);
            throw this.handleError(error);
        }
    }

    public async getServerActiveUsers(serverId: string, token: string): Promise<ApiResponse<ServerUser[]>> {
        try {
            if (!this.baseUrl) throw new Error("Missing baseUrl Variable!");

            const response = await fetch(`${this.baseUrl}/server/${serverId}/active-users`, {
                method: 'GET',
                headers: {
                    ...this.getHeaders(),
                    'Authorization': token
                }
            });

            return this.handleResponse<ApiResponse<ServerUser[]>>(response);
        } catch (error) {
            console.error('API Error:', error);
            throw this.handleError(error);
        }
    }

    public async getServerByInvitation(globalInvitationId: string, fingerprint: string = ""): Promise<InviteServerResponse<ServerInviteData>> {
        try {
            if (!this.baseUrl) throw new Error("Missing baseUrl Variable!");

            const response = await fetch(`${this.baseUrl}/server/invitation/${globalInvitationId}`, {
                method: 'POST',
                headers: {
                    ...this.getHeaders(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fingerprint }),
                cache: 'no-store' // For server-side rendering
            });

            return this.handleResponse<InviteServerResponse<ServerInviteData>>(response);
        } catch (error) {
            console.error('API Error:', error);
            throw this.handleError(error);
        }
    }

    public async getServerByUniqueInvitation(uniqueInvitationId: string, fingerprint: string = ""): Promise<InviteServerResponse<ServerInviteData>> {
        try {
            if (!this.baseUrl) throw new Error("Missing baseUrl Variable!");

            const response = await fetch(`${this.baseUrl}/server/unique-invitation/${uniqueInvitationId}`, {
                method: 'POST',
                headers: {
                    ...this.getHeaders(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fingerprint }),
                cache: 'no-store' // For server-side rendering
            });

            return this.handleResponse<InviteServerResponse<ServerInviteData>>(response);
        } catch (error) {
            console.error('API Error:', error);
            throw this.handleError(error);
        }
    }

    public async generateUniqueInvitation(serverId: string, token: string): Promise<ApiResponse<{ inviteCode: string}>> {
        try {
            if (!this.baseUrl) throw new Error("Missing baseUrl Variable!");

            const response = await fetch(`${this.baseUrl}/server/${serverId}/generate-unique-server-invitation-id`, {
                method: 'GET',
                headers: {
                    ...this.getHeaders(),
                    'Authorization': token
                }
            });

            return this.handleResponse<ApiResponse<{ inviteCode: string}>>(response);
        } catch (error) {
            console.error('API Error:', error);
            throw this.handleError(error);
        }
    }

    public async getServerMessages(serverId: string, token: string): Promise<ApiResponse<Message[]>> {
        try {
            if (!this.baseUrl) throw new Error("Missing baseUrl Variable!");

            const response = await fetch(`${this.baseUrl}/server/${serverId}/messages`, {
                method: 'GET',
                headers: {
                    ...this.getHeaders(),
                    'Authorization': token
                }
            });

            return this.handleResponse<ApiResponse<Message[]>>(response);
        } catch (error) {
            console.error('API Error:', error);
            throw this.handleError(error);
        }
    }

    private handleError(error: unknown): Error {
        if (error instanceof Error) {
            return error;
        }
        return new Error('An unexpected error occurred');
    }
}

// Export singleton instance
export const apiService = ApiService.getInstance();