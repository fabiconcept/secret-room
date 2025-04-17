import { creepyWords, defaultOptions } from "@/constants/index.constant";
import { GeneratorOptions } from "@/types";
import toast from "react-hot-toast";

/**
 * Generates a random creepy server name using various word combinations
 * @param options Configuration options for name generation
 * @returns A randomly generated creepy server name
 */
export function generateServerName(options: GeneratorOptions): string {
    const config = { ...defaultOptions, ...options };
    const { includeLocation, includeSuffix, maxLength, separator } = config;

    // Get random words from each category
    const getRandomWord = (array: string[]) => array[Math.floor(Math.random() * array.length)];

    // Determine name structure
    const nameComponents: string[] = [];
    const roll = Math.random();

    if (roll < 0.3) {
        // Structure: Adjective + Noun (30% chance)
        nameComponents.push(getRandomWord(creepyWords.adjectives));
        nameComponents.push(getRandomWord(creepyWords.nouns));
    } else if (roll < 0.6) {
        // Structure: Noun + Location (30% chance)
        nameComponents.push(getRandomWord(creepyWords.nouns));
        includeLocation && nameComponents.push(getRandomWord(creepyWords.locations));
    } else {
        // Structure: Adjective + Location (40% chance)
        nameComponents.push(getRandomWord(creepyWords.adjectives));
        includeLocation && nameComponents.push(getRandomWord(creepyWords.locations));
    }

    // Add suffix with probability if enabled
    if (includeSuffix && Math.random() < 0.4) {
        nameComponents.push(getRandomWord(creepyWords.suffixes));
    }

    // Join components and ensure length constraint
    let serverName = nameComponents.join(separator);
    if (serverName.length > maxLength) {
        serverName = serverName.substring(0, maxLength).trim();
    }

    return serverName;
}

/**
 * Generates a highly secure encryption key using multiple entropy sources
 * @param length Length of the encryption key (default: 32)
 * @returns A complex encryption key string
 */
export function generateEncryptionKey(length: number = 32): string {
    // Character sets for different complexity requirements
    const charset = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        hexChars: 'ABCDEF0123456789',
        base64Chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+'
    };

    // Entropy collection function
    const getEntropy = () => {
        const values = [
            Date.now(),
            performance.now(),
            Math.random(),
            crypto.getRandomValues(new Uint32Array(1))[0],
            // Add some "chaos" from DOM/environment state
            window.innerWidth,
            window.innerHeight,
            document.documentElement.scrollTop,
            new Date().getTimezoneOffset()
        ];

        return values.reduce((acc, val) => acc ^ (val >>> 0), 0).toString(16);
    };

    // Generate initial entropy pool
    let entropyPool = '';
    for (let i = 0; i < Math.ceil(length / 8); i++) {
        entropyPool += getEntropy();
    }

    // Key generation with pattern enforcement
    let key = '';
    const patterns = [
        // Ensure key starts with hex pattern
        () => charset.hexChars[Math.floor(Math.random() * charset.hexChars.length)],
        // Add uppercase + number pattern
        () => charset.uppercase[Math.floor(Math.random() * charset.uppercase.length)] +
            charset.numbers[Math.floor(Math.random() * charset.numbers.length)],
        // Add special char + lowercase pattern
        () => charset.specialChars[Math.floor(Math.random() * charset.specialChars.length)] +
            charset.lowercase[Math.floor(Math.random() * charset.lowercase.length)],
        // Add base64 pattern
        () => charset.base64Chars[Math.floor(Math.random() * charset.base64Chars.length)]
    ];

    // Build the key with enforced patterns and entropy mixing
    while (key.length < length) {
        // Apply a random pattern
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        let segment = pattern();

        // Mix in entropy
        const entropyByte = entropyPool[key.length % entropyPool.length];
        segment = segment.split('')
            .map(char => {
                const charCode = char.charCodeAt(0);
                return String.fromCharCode(charCode ^ entropyByte.charCodeAt(0));
            })
            .join('');

        key += segment;
    }

    // Final entropy pass and length adjustment
    return key
        .split('')
        .map((char, index) => {
            const entropyChar = entropyPool[index % entropyPool.length];
            const mixed = String.fromCharCode(
                (char.charCodeAt(0) + entropyChar.charCodeAt(0)) % 128
            );
            return charset.base64Chars[mixed.charCodeAt(0) % charset.base64Chars.length];
        })
        .join('')
        .slice(0, length);
}

/**
 * Generates a unique fingerprint based on browser and system properties
 * @returns A unique fingerprint string
 */
export async function getUniqueFingerprint() {
    const props = [];

    // Screen Resolution + DPR
    props.push(`Screen:${window.screen.width}x${window.screen.height}`);
    props.push(`DPR:${window.devicePixelRatio}`);

    // Timezone Offset
    props.push(`Timezone:${new Date().getTimezoneOffset()}`);

    // Operating System and Browser Info
    props.push(`OS:${navigator.platform}`);
    props.push(`UA:${navigator.userAgent}`);
    props.push(`Engine:${navigator.product}`);

    // Browser Capabilities
    props.push(`Cookies:${navigator.cookieEnabled}`);
    props.push(`DoNotTrack:${navigator.doNotTrack}`);
    props.push(`MaxTouchPoints:${navigator.maxTouchPoints}`);
    props.push(`HardwareConcurrency:${navigator.hardwareConcurrency}`);
    props.push(`Memory:${(navigator as any).deviceMemory || 'Unknown'}`);

    // Canvas Fingerprint
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillStyle = '#F60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText('Fingerprint', 2, 15);
            ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
            ctx.fillText('Fingerprint', 4, 17);
            props.push(`Canvas:${canvas.toDataURL()}`);
        }
    } catch (e) {
        props.push(`Canvas:NotSupported`);
    }

    // Audio Devices
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = devices.filter(device => device.kind === "audioinput").length;
        props.push(`AudioDevices:${audioDevices}`);
    } catch (e) {
        props.push(`AudioDevices:Unknown`);
    }

    // WebGL Info
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                props.push(`GPU:${renderer}`);
                props.push(`Vendor:${vendor}`);
            }
        }
    } catch (e) {
        props.push(`WebGL:NotSupported`);
    }

    // Language Preference
    props.push(`Lang:${navigator.language}`);
    props.push(`Languages:${navigator.languages?.join(',')}`);

    // Color Depth
    props.push(`ColorDepth:${window.screen.colorDepth}`);
    props.push(`PixelDepth:${window.screen.pixelDepth}`);

    // Generate a hash from the collected properties
    return hashString(props.join("|"));
}

/**
 * Hashes a string using SHA-256
 * @param str String to hash
 * @returns Hashed string
 */
async function hashString(str: string): Promise<string> {
    const msgUint8 = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

async function copyText(text: string) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy text:', err);
    }
}

/**
 * Copies text to clipboard with loading and success/error notifications
 * @param text Text to copy
 */
export const performCopy = (text: string) => {
    const promise = copyText(text);
    toast.promise(promise, {
        loading: 'Copying to clipboard...',
        success: 'Copied to clipboard!',
        error: 'Failed to copy to clipboard'
    });
};

/**
 * Formats the last seen time in a concise way
 * @param lastSeen Date of last seen
 * @returns Concise string representing time since last seen
 */
export function formatLastSeen(lastSeen: Date): string {
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - lastSeen.getTime()) / 1000);

    // Just now (less than 1 minute)
    if (diffSeconds < 60) {
        return `${diffSeconds}s`;
    }

    // Minutes (less than 1 hour)
    if (diffSeconds < 3600) {
        const minutes = Math.floor(diffSeconds / 60);
        return `${minutes}m`;
    }

    // Hours (less than 1 day)
    if (diffSeconds < 86400) {
        const hours = Math.floor(diffSeconds / 3600);
        return `${hours}h`;
    }

    // Days (less than 7 days)
    if (diffSeconds < 604800) {
        const days = Math.floor(diffSeconds / 86400);
        return `${days}d`;
    }

    // Weeks or longer - show date
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return lastSeen.toLocaleDateString(undefined, options);
}

/**
 * Checks if a string contains only emoji characters
 * @param text Text to check
 * @returns True if text contains only emoji characters, false otherwise
 */
export function isOnlyEmojis(text: string) {
    const emojiRegex = /^[\p{Emoji}]+$/u;
    return emojiRegex.test(text);
}

/**
 * Counts the number of emoji characters in a string
 * @param text Text to count
 * @returns Number of emoji characters
 */
export function countEmojis(text: string) {
    const emojiRegex = /[\p{Emoji}]/gu;
    return text.match(emojiRegex)?.length || 0;
}

/**
 * Wraps URLs in anchor tags for clickable links
 * @param text Text to wrap
 * @returns Text with URLs wrapped in anchor tags
 */
export function wrapUrlsWithAnchors(text: string) {
    const urlRegex = /(https?:\/\/|www\.)[^\s]+/g;

    return text.replace(urlRegex, (url) => {
        const href = url.startsWith('www.') ? `https://${url}` : url;
        return `<a href="${href}" class="text-blue-400 hover:underline underline-offset-2" target="_blank">${url}</a>`;
    });
}

/**
* Checks if a string is a common chat acronym or short word
* @param text The string to check
* @returns boolean indicating if the text is a chat acronym
*/
export function isChatAcronym(text: string): boolean {
    if (!text || typeof text !== 'string') {
        return false;
    }

    // Convert to uppercase for case-insensitive matching
    const upperText = text.trim().toUpperCase();

    // Common two-letter words
    const commonShortWords = new Set([
        'NO', 'OK', 'HI', 'BYE', 'GO', 'SO', 'TO', 'UP', 'WE', 'ME', 'HE', 'SHE', 'IT', 'AM', 'IS', 'BE',
        'DO', 'BY', 'MY', 'IN', 'ON', 'AT', 'IF', 'OF', 'OR', 'AS', 'AN', 'US', 'YO', 'YA', 'UM', 'OH',
        'AH', 'EH', 'MM', 'HM', 'UH', 'HA', 'YE', 'YA', 'UH', 'YO'
    ]);

    // Common chat acronyms/abbreviations 
    // Includes classic ones and newer slang
    const chatAcronyms = new Set([
        // Classic chat acronyms
        'LOL', 'ROFL', 'LMAO', 'TTYL', 'BRB', 'AFK', 'IDK', 'IMO', 'IMHO', 'FYI', 'BTW', 'TBH',
        'OMG', 'WTF', 'GTG', 'IRL', 'NVM', 'JK', 'BFF', 'TMI', 'TL;DR', 'TLDR', 'DM', 'PM',
        'TY', 'THX', 'TYSM', 'TTYS', 'FAQ', 'NP', 'OMW', 'DIY', 'OFC', 'FTW', 'SMH', 'NGL',
        'RN', 'GG', 'WYD', 'HMU', 'FOMO', 'TBT', 'SFW', 'NSFW', 'AMA', 'ELI5', 'FB', 'IG',
        'WP', 'FF', 'GJ', 'ILY', 'NBD', 'OOTD', 'PPL', 'ASAP', 'AF', 'DND', 'BFN',

        // Modern/newer slang
        'IYKYK', 'LOML', 'GOAT', 'OTP', 'TFW', 'MFW', 'YSK', 'FTR', 'TIL', 'SRSLY',
        'WDYM', 'IDGAF', 'IMY', 'ICYMI', 'IKR', 'JW', 'KMS', 'KMN', 'LMK', 'OOMF',
        'RT', 'SMDH', 'SNS', 'ISTG', 'TMW', 'FBF', 'ILY', 'MCM', 'WCW', 'YOLO',
        'FR', 'NTH', 'HTH', 'POV', 'W', 'L', 'TFT', 'KYS', 'DTB', 'DTF', 'SIU',
        'LFG', 'IDFK', 'IDC', 'IK', 'TYT', 'WDYT', 'YT', 'HP', 'SUS', 'NB',
        'HBU', 'HBD', 'BS', 'BTS', 'FT', 'GN', 'GM', 'GMS', 'PS', 'SYBAU',

        // Academic/professional acronyms that become chat acronyms
        'FYA', 'EOD', 'ETA', 'ETA', 'OOO', 'COB', 'EOB', 'TBA', 'TBD', 'WFH',
        'FYSA', 'FWIW', 'IIRC', 'YMMV', 'AFAIK', 'AFAICT', 'IIUC', 'IANAL'
    ]);

    // Check if it's a common short word
    if (upperText.length <= 2 && commonShortWords.has(upperText)) {
        return true;
    }

    // Check if it's a chat acronym
    return chatAcronyms.has(upperText);
}

/**
 * Downloads a file from a URL
 * @param contentUrl URL of the file to download
 * @param customFilename Optional custom filename for the downloaded file
 */
export const downloadHandler = async (contentUrl: string, customFilename?: string) => {
    try {
        // Fetch the content
        const response = await fetch(contentUrl);
        
        if (!response.ok) {
            console.error(`Failed to download: ${response.status} ${response.statusText}`);
            return;
        }
        
        // Get the blob data
        const blob = await response.blob();
        
        // Create object URL for the blob
        const objectUrl = URL.createObjectURL(blob);
        
        // Determine filename and extension
        let filename = customFilename;
        
        if (!filename) {
            // Extract filename from URL or use a sanitized version of the URL
            const urlFilename = contentUrl.split('/').pop();
            filename = urlFilename || `file_${Date.now()}`;
            
            // Remove query parameters if present
            filename = filename.split('?')[0];
        }
        
        // Get file extension from Content-Type if available
        const contentType = response.headers.get('Content-Type');
        if (contentType && !filename.includes('.')) {
            const ext = contentType.split('/').pop();
            if (ext) {
                filename = `${filename}.${ext}`;
            }
        }
        
        // Create and trigger download link
        const link = document.createElement('a');
        link.href = objectUrl;
        link.setAttribute('download', filename);
        
        // Add to document, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the object URL after download starts
        setTimeout(() => {
            URL.revokeObjectURL(objectUrl);
        }, 100);
        
    } catch (error) {
        console.error('Download failed:', error);
        throw error;
    }
};