export interface AppSettings {
    theme: 'light' | 'dark';
    notifications: boolean;
    soundEnabled: boolean;
}

export enum STORAGE_KEYS {
    USER_ID = 'user_id',
    CURRENT_SERVER_ID = 'current_server_id',
    APP_SETTINGS = 'app_settings',
}

export interface GeneratorOptions {
    includeLocation?: boolean;
    includeSuffix?: boolean;
    maxLength: number;
    separator?: string;
}
export type WordCategory = {
    adjectives: string[];
    nouns: string[];
    locations: string[];
    suffixes: string[];
};

export interface Message {
    serverId: string,
    senderId: string,
    receiverId: string,
    content: string,
    createdAt: Date,
    read: boolean
}