// Helper function to safely parse JSON
const safeJSONParse = <T>(data: string | null, fallback: T): T => {
    if (!data) return fallback;
    try {
        return JSON.parse(data) as T;
    } catch {
        return fallback;
    }
};

// Primary storage functions
export const setItem = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = <T>(key: string, fallback: T): T => {
    const data = localStorage.getItem(key);
    return safeJSONParse(data, fallback);
};

export const removeItem = (key: string): void => {
    localStorage.removeItem(key);
};

// App settings management
export const getAppSettings = (): AppSettings => {
    const defaultSettings: AppSettings = {
        theme: 'light',
        notifications: true,
        soundEnabled: true,
    };

    return getItem(STORAGE_KEYS.APP_SETTINGS, defaultSettings);
};

export const updateAppSettings = (settings: Partial<AppSettings>): void => {
    const currentSettings = getAppSettings();
    const newSettings = { ...currentSettings, ...settings };
    setItem(STORAGE_KEYS.APP_SETTINGS, newSettings);
};