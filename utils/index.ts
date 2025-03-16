import { creepyWords, defaultOptions } from "@/constants/index.constant";

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

export async function getUniqueFingerprint() {
    const props = [];

    // Screen Resolution + DPR
    props.push(`Screen:${window.screen.width}x${window.screen.height}`);
    props.push(`DPR:${window.devicePixelRatio}`);

    // Timezone Offset
    props.push(`Timezone:${new Date().getTimezoneOffset()}`);

    // Operating System
    props.push(`OS:${navigator.platform}`);

    // Audio Devices
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = devices.filter(device => device.kind === "audioinput").length;
        props.push(`AudioDevices:${audioDevices}`);
    } catch (e) {
        props.push(`AudioDevices:Unknown`);
    }

    // Language Preference
    props.push(`Lang:${navigator.language}`);

    // Generate a hash from the collected properties
    return hashString(props.join("|"));
}

async function hashString(str: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

