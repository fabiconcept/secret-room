import { CreateServerRequest, ServerResponse, CreateServerResponse } from "@/app/types/server.types";

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

    public async getServer(serverId: string): Promise<CreateServerResponse<ServerResponse>> {
        try {
            if (!this.baseUrl) throw new Error("Missing baseUrl Variable!");

            const response = await fetch(`${this.baseUrl}/server/${serverId}`, {
                method: 'GET',
                headers: {
                    ...this.getHeaders(),
                }
            });

            return this.handleResponse<CreateServerResponse<ServerResponse>>(response);
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