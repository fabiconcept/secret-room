interface TokenResponse {
    token: string;
    expiresIn: number;
    scope: string[];
}

class SirvClient {
    private clientId: string;
    private clientSecret: string;
    private baseApiUrl: string;
    private cdnUrl: string;

    constructor() {
        this.clientId = process.env.NEXT_PUBLIC_SIRV_CLIENT_ID!;
        this.clientSecret = process.env.NEXT_PUBLIC_SIRV_CLIENT_SECRET!;
        this.baseApiUrl = process.env.NEXT_PUBLIC_SIRV_API_URL!;
        this.cdnUrl = process.env.NEXT_PUBLIC_SIRV_CDN_URL!;

        if (!this.clientId || !this.clientSecret) {
            throw new Error('Sirv client ID or secret is not defined in environment variables');
        }

        if (!this.baseApiUrl || !this.cdnUrl) {
            throw new Error('Sirv API URL or CDN URL is not defined in environment variables');
        }
    }

    /**
     * Fetches an authentication token from Sirv API
     * @returns Promise<string> The authentication token
     */
    private async fetchToken(): Promise<string> {
        try {
            const response = await fetch(`${this.baseApiUrl}/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId: this.clientId,
                    clientSecret: this.clientSecret
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch token: ${response.statusText}`);
            }

            const data: TokenResponse = await response.json();
            return data.token;
        } catch (error) {
            console.error('Token fetch failed:', error);
            throw error;
        }
    }

    /**
     * Uploads a file to Sirv
     * @param selectedFile The file to upload
     * @param generateFileName Optional function to customize filename generation
     * @returns Promise<string> The URL of the uploaded file
     */
    public async uploadAttachment(
        selectedFile: File,
        generateFileName: (file: File) => string = this.defaultGenerateFileName
    ): Promise<string> {
        try {
            const bearerToken = await this.fetchToken();
            const fileName = generateFileName(selectedFile);
            const filenameDecoded = `/attachments/${fileName}`;
            const filenameEncoded = encodeURIComponent(filenameDecoded);

            const uploadUrl = `${this.baseApiUrl}/files/upload?filename=${filenameEncoded}`;
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: selectedFile,
                headers: {
                    "Authorization": `Bearer ${bearerToken}`,
                    'Content-Type': selectedFile.type
                },
            });

            if (!response.ok) {
                throw new Error(`Error uploading file: ${await response.text()}`);
            }

            return `${this.cdnUrl}${filenameDecoded}`;
        } catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    }

    /**
     * Default method to generate a filename for uploads
     * Can be overridden when calling uploadAttachment
     */
    private defaultGenerateFileName(file: File): string {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 10);
        const fileExtension = file.name.split('.').pop();
        return `${timestamp}-${randomString}.${fileExtension}`;
    }
}

// Export the class
export default SirvClient;