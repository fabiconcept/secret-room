import { creepyWords, defaultOptions } from "@/constants/index.constant";
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
            ctx.fillRect(125,1,62,20);
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