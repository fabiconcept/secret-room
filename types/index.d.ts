declare interface AppSettings {
    theme: 'light' | 'dark';
    notifications: boolean;
    soundEnabled: boolean;
}

declare enum STORAGE_KEYS {
    USER_ID = 'user_id',
    CURRENT_SERVER_ID = 'current_server_id',
    APP_SETTINGS = 'app_settings',
}

declare interface GeneratorOptions {
    includeLocation?: boolean;
    includeSuffix?: boolean;
    maxLength: number;
    separator?: string;
}
declare type WordCategory = {
    adjectives: string[];
    nouns: string[];
    locations: string[];
    suffixes: string[];
};