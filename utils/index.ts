import { defaultOptions } from "@/constants/index.constant";
import { wordsCategories } from "@/constants/words";
import { GeneratorOptions } from "@/types";
import toast from "react-hot-toast";

/**
 * Generates a random creepy server name using various word combinations
 * @param options Configuration options for name generation
 * @returns A randomly generated creepy server name
 */
export function generateServerName(options: GeneratorOptions): string {
    const config = { ...defaultOptions, ...options };
    const { includeLocation, category, maxLength, separator } = config;

    // Get random words from each category
    const getRandomWord = (array: string[]) => array[Math.floor(Math.random() * array.length)];

    // Determine name structure
    const nameComponents: string[] = [];
    const roll = Math.random();

    const wordMixer = wordsCategories[category];

    if (roll < 0.3) {
        // Structure: Adjective + Noun (30% chance)
        nameComponents.push(getRandomWord(wordMixer.adjectives));
        nameComponents.push(getRandomWord(wordMixer.nouns));
    } else if (roll < 0.6) {
        // Structure: Noun + Location (30% chance)
        nameComponents.push(getRandomWord(wordMixer.nouns));
        includeLocation && nameComponents.push(getRandomWord(wordMixer.locations));
    } else {
        // Structure: Adjective + Location (40% chance)
        nameComponents.push(getRandomWord(wordMixer.adjectives));
        includeLocation && nameComponents.push(getRandomWord(wordMixer.locations));
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

    // Common two-letter words and expressions
    const commonShortWords = new Set([
        // Original entries
        'NO', 'OK', 'HI', 'BYE', 'GO', 'SO', 'TO', 'UP', 'WE', 'ME', 'HE', 'SHE', 'IT', 'AM', 'IS', 'BE',
        'DO', 'BY', 'MY', 'IN', 'ON', 'AT', 'IF', 'OF', 'OR', 'AS', 'AN', 'US', 'YO', 'YA', 'UM', 'OH',
        'AH', 'EH', 'MM', 'HM', 'UH', 'HA', 'YE', 'YA', 'UH', 'YO',

        // Additional common English two-letter words
        'AD', 'AX', 'AY', 'BA', 'BI', 'BO', 'ED', 'EF', 'EL', 'EM', 'EN', 'ER', 'ES', 'ET', 'EW', 'EX',
        'FA', 'FE', 'GO', 'GU', 'HE', 'HI', 'HO', 'ID', 'IF', 'IN', 'IO', 'IS', 'IT', 'JO', 'KA', 'KI',
        'LA', 'LI', 'LO', 'MA', 'ME', 'MI', 'MM', 'MO', 'MU', 'MY', 'NA', 'NE', 'NO', 'NU', 'OD', 'OE',
        'OF', 'OH', 'OI', 'OK', 'OM', 'ON', 'OP', 'OR', 'OS', 'OW', 'OX', 'OY', 'PA', 'PE', 'PI', 'PO',
        'QI', 'RE', 'SH', 'SI', 'SO', 'TA', 'TI', 'TO', 'UH', 'UM', 'UN', 'UP', 'UR', 'US', 'UT', 'WE',
        'WO', 'XI', 'XU', 'YA', 'YE', 'YO', 'YU', 'ZA', 'ZO',

        // Possessives and pronouns
        'I\'M', 'I\'D', 'I\'L', 'HE\'S', 'SHE\'S', 'IT\'S', 'WE\'D', 'WE\'L', 'YOU\'D', 'THEY\'D',

        // Common contractions
        'AIN\'T', 'CAN\'T', 'DON\'T', 'ISN\'T', 'DIDN\'T', 'WON\'T', 'WASN\'T', 'AREN\'T', 'HASN\'T',

        // Two-letter prepositions and conjunctions 
        'AT', 'BY', 'IF', 'IN', 'OF', 'ON', 'OR', 'SO', 'TO', 'UP',

        // Common pronouns
        'HE', 'SHE', 'ME', 'WE', 'IT', 'US', 'I\'L',

        // Common articles
        'AN', 'A',

        // Common expressions/interjections
        'AW', 'EW', 'HA', 'HM', 'MM', 'OH', 'OW', 'OY', 'SH', 'UH', 'UM', 'YO',

        // Two-letter foreign words common in English
        'AU', 'DE', 'EN', 'ET', 'LE', 'LA', 'SI', 'UN', 'UNE', 'NE', 'PAS', 'EL',

        // Common two-letter abbreviations and shortened words
        'TV', 'PC', 'CD', 'DJ', 'MC', 'ID', 'IQ', 'IP', 'HD', 'HR', 'AM', 'FM', 'PM', 'AC', 'DC',
        'VR', 'AR', 'AI', 'CV', 'PR', 'UK', 'US', 'EU', 'UN', 'IQ', 'EQ', 'PG', 'UX', 'UI', 'OS',
        'RV', 'QB', 'VP',

        // Internet/text shorthand
        'TY', 'GG', 'WP', 'FF', 'GJ', 'NB', 'WB', 'GM', 'GN', 'HF', 'GL', 'DM', 'PM', 'TW', 'FB',
        'IG', 'YT', 'OP', 'HP', 'XP', 'OG', 'RL', 'IK', 'JK', 'TW', 'BS', 'PR', 'PC', 'SU', 'RU'
    ]);

    // Common chat acronyms/abbreviations/slang
    const chatAcronyms = new Set([
        // Original classic chat acronyms
        'LOL', 'ROFL', 'LMAO', 'TTYL', 'BRB', 'AFK', 'IDK', 'IMO', 'IMHO', 'FYI', 'BTW', 'TBH',
        'OMG', 'WTF', 'GTG', 'IRL', 'NVM', 'JK', 'BFF', 'TMI', 'TL;DR', 'TLDR', 'DM', 'PM',
        'TY', 'THX', 'TYSM', 'TTYS', 'FAQ', 'NP', 'OMW', 'DIY', 'OFC', 'FTW', 'SMH', 'NGL',
        'RN', 'GG', 'WYD', 'HMU', 'FOMO', 'TBT', 'SFW', 'NSFW', 'AMA', 'ELI5', 'FB', 'IG',
        'WP', 'FF', 'GJ', 'ILY', 'NBD', 'OOTD', 'PPL', 'ASAP', 'AF', 'DND', 'BFN',

        // Original modern/newer slang
        'IYKYK', 'LOML', 'GOAT', 'OTP', 'TFW', 'MFW', 'YSK', 'FTR', 'TIL', 'SRSLY',
        'WDYM', 'IDGAF', 'IMY', 'ICYMI', 'IKR', 'JW', 'KMS', 'KMN', 'LMK', 'OOMF',
        'RT', 'SMDH', 'SNS', 'ISTG', 'TMW', 'FBF', 'ILY', 'MCM', 'WCW', 'YOLO',
        'FR', 'NTH', 'HTH', 'POV', 'W', 'L', 'TFT', 'KYS', 'DTB', 'DTF', 'SIU',
        'LFG', 'IDFK', 'IDC', 'IK', 'TYT', 'WDYT', 'YT', 'HP', 'SUS', 'NB',
        'HBU', 'HBD', 'BS', 'BTS', 'FT', 'GN', 'GM', 'GMS', 'PS', 'SYBAU',

        // Original academic/professional acronyms that become chat acronyms
        'FYA', 'EOD', 'ETA', 'ETA', 'OOO', 'COB', 'EOB', 'TBA', 'TBD', 'WFH',
        'FYSA', 'FWIW', 'IIRC', 'YMMV', 'AFAIK', 'AFAICT', 'IIUC', 'IANAL',

        // Additional classic chat acronyms
        'ROTFL', 'ROTFLOL', 'LOLZ', 'LULZ', 'LMFAO', 'LYLAS', 'LYLAB', 'LYLC', 'LMIRL',
        'BBS', 'BBL', 'B4N', 'CU', 'CYA', 'CYE', 'CYT', 'DIKU', 'F2F', 'G2G', 'G2B',
        'G4C', 'H2CUS', 'HAGN', 'HAGO', 'IAC', 'IAE', 'ILU', 'ILY', 'IM', 'IOH', 'IOW',
        'IRL', 'ISO', 'J4F', 'JAS', 'JIC', 'JSYK', 'KFY', 'KPC', 'L8R', 'LD', 'LDR',
        'LMK', 'LOL', 'LTNC', 'MHOTY', 'NIMBY', 'NLT', 'NM', 'NRN', 'OIC', 'OMW',
        'OOC', 'OT', 'OTOH', 'PHAT', 'PLZ', 'POS', 'POV', 'PTB', 'QT', 'RUT', 'RUOK',
        'SOL', 'SRY', 'THX', 'TTFN', 'TTYL', 'TTYS', 'TYT', 'TYL', 'WB', 'WTG', 'WYWH',
        'XOXO', 'Y2K', 'YBS', 'DKDC', 'FWIW', 'HTH', 'KISS', 'PFA', 'PMJI', 'POC', 'HAND',

        // Additional modern internet/gaming slang
        'ADS', 'AOE', 'AOM', 'APM', 'BM', 'CC', 'CD', 'CTRL', 'DPS', 'ELO', 'EXP', 'FF', 'FPS',
        'GLHF', 'GG EZ', 'GLWT', 'GS', 'HP', 'IMBA', 'INT', 'KDR', 'KS', 'META', 'MMR', 'MOBA',
        'MP', 'MVP', 'NERF', 'NPC', 'OP', 'POG', 'POGGERS', 'PVE', 'PVP', 'QQ', 'RNG', 'RP',
        'RPG', 'RTS', 'STRAT', 'TDM', 'TP', 'ULT', 'VAC', 'WC', 'XP', 'BGM', 'OST', 'MMORPG',
        'AFK', 'DLC', 'FTL', 'FTW', 'GFX', 'GFY', 'GG', 'GIT GUD', 'HUD', 'LAN', 'LAG', 'PUBG',
        'BR', 'KEKW', 'COPIUM', 'HOPIUM', 'MALDING', 'SALTY', 'SWEATY', 'TRYHARD', 'GANKED',
        'FARMED', 'CARRIED', 'BOOSTED', 'GRIEF', 'INTING', 'TOXIC', 'THROW', 'FEED',

        // Additional social media & modern slang
        'AAVE', 'ATP', 'ACAB', 'BAE', 'BBG', 'BBY', 'BMS', 'CEO', 'CHEUGY', 'DEF', 'DW',
        'DEADASS', 'DYK', 'ESH', 'FINSTA', 'FML', 'FTFY', 'FWIW', 'HBD', 'ICYMI', 'IFYKYK',
        'IKYFL', 'IMK', 'ITS GIVING', 'JFC', 'KWIM', 'LBVS', 'LFR', 'LIT', 'MOOD', 'NPC',
        'NPCCORE', 'OFC', 'OML', 'ONG', 'OOMF', 'PERIODT', 'RQ', 'SHEESH', 'SKSKSK', 'SLAYED',
        'SMOL', 'STAN', 'TIKTOK', 'WELP', 'WILDIN', 'YAS', 'YEET', 'BUSSIN', 'NO CAP', 'RIZZ',
        'BOUJEE', 'BASED', 'AYO', 'CRINGE', 'RENT FREE', 'MAIN CHARACTER', 'UNDERSTOOD THE ASSIGNMENT',
        'GATEKEEP', 'GASLIGHTING', 'HITS DIFFERENT', 'TOUCH GRASS', 'UNHINGED', 'VIBE CHECK',
        'LIVING RENT FREE', 'BIG YIKES', 'RATIO', 'LIVING MY BEST LIFE', 'IG', 'TFG',

        // Additional work/professional acronyms and slang
        'ASAIC', 'ASAP', 'BAU', 'BCC', 'BID', 'BOM', 'C-SUITE', 'CAB', 'CAPEX', 'CCing',
        'CFO', 'CIO', 'CMO', 'COB', 'COP', 'CRM', 'CTA', 'CTO', 'CX', 'CYA', 'EOB', 'EOD',
        'EOW', 'EOM', 'EOQ', 'ERP', 'FIFO', 'FSO', 'FTE', 'FYA', 'FYE', 'FYI', 'GDPR', 'HIPAA',
        'HQ', 'HR', 'IP', 'IPO', 'IR', 'IT', 'ITIL', 'KPI', 'LIFO', 'LTV', 'M&A', 'MoM', 'MVP',
        'NAFTA', 'NDA', 'NPV', 'OKR', 'OOO', 'OPEX', 'OT', 'OTP', 'P&L', 'PCP', 'PDF', 'PM',
        'PMO', 'PO', 'POC', 'PPTX', 'PR', 'PTO', 'QBR', 'QoQ', 'R&D', 'RFI', 'RFP', 'ROI',
        'SDE', 'SEO', 'SLA', 'SME', 'SWOT', 'TED', 'TLDR', 'TOC', 'TOS', 'UAT', 'UI', 'USP',
        'UX', 'VC', 'VPN', 'WBS', 'WFH', 'WIIFM', 'WYSIWYG', 'YOY', 'YTD', 'SMART', 'RAID',

        // Extended internet slang/memes
        'AFAICT', 'AKA', 'ATM', 'B2B', 'B2C', 'CMIW', 'CPOC', 'CYTD', 'DBA', 'DEV', 'DOA',
        'DOB', 'DOE', 'ECPI', 'ELI5', 'EOC', 'FAANG', 'FAFO', 'GAFAM', 'GB', 'GCS', 'GTK',
        'HIJKLMNO', 'IANAD', 'IANAL', 'IB', 'IDK', 'IME', 'IMHO', 'IIRC', 'IMF', 'IRL', 'ISO',
        'J/K', 'JIT', 'JSYK', 'LTNS', 'LTR', 'MIRL', 'MOTD', 'NEET', 'NFT', 'NOYB', 'NTK',
        'OTFLMAO', 'PAW', 'PC', 'PDT', 'PEBKAC', 'PITA', 'PST', 'QED', 'QOTD', 'REM', 'RFLOL',
        'RSI', 'RSN', 'RTFM', 'SCNR', 'SCUBA', 'SEP', 'SJW', 'SMH', 'TAFN', 'TANSTAAFL', 'TBC',
        'TBD', 'TBH', 'TIFU', 'TFT', 'TIA', 'TIL', 'TINA', 'TINWIS', 'TL;DR', 'TMI', 'TPTB',
        'TTBOMK', 'TWIAVBP', 'TWSS', 'TYVM', 'VOD', 'WFM', 'WOMBAT', 'YAGNI', 'YKINMK', 'YMMV',
        'ZZZ', 'TQ',

        // More recent social media terms
        'CEO OF', 'CORE', 'DEMURE', 'ERA', 'FANUM TAX', 'GYAT', 'HUH', 'FATHER RIZZ', 'MOTHER',
        'REAL', 'SLEEPY', 'SIGMA', 'SKIBIDI', 'WORDINGTON', 'WOCK', 'OHIO', 'AHEGAO', 'WAIFU',
        'HUSBANDO', 'ORA', 'MUDA', 'JOJO', 'WEEB', 'OTAKU', 'KAWAII', 'SENPAI', 'KOHAI', 'ISEKAI',
        'ML', 'AI', 'GPT', 'ASL', 'DNF', 'DNI', 'GRWM', 'ASMR', 'STFU', 'STG', 'BET', 'NR',
        'IB', 'S/O', 'MLA', 'APA', 'PTFO', 'TTM', 'IAM', 'OKRT', 'NOYB',

        // More exclamatory expressions
        'FFS', 'JFC', 'FML', 'FMY', 'FMH', 'IJBOL', 'TWSS', 'KYS', 'KMS', 'KMN', 'PTFO',
        'STFO', 'STFU', 'GTFO', 'CTFO', 'BTFO', 'DYAC', 'FYVM', 'GBTW', 'HSIK', 'ISAGN',
        'IWSN', 'HFSB', 'KMSL', 'NIFOC', 'POS', 'SNAFU', 'SWYP', 'TWAK', 'TISL',

        // Technology related
        'API', 'SDK', 'URL', 'GUI', 'IoT', 'ML', 'AI', 'GPT', 'AR', 'VR', 'IDE', 'CPU', 'GPU',
        'RAM', 'ROM', 'SSD', 'HDD', 'NIC', 'DNS', 'ISP', 'LAN', 'WAN', 'MAN', 'HTTP', 'FTP',
        'SSH', 'VPN', 'SQL', 'XML', 'JSON', 'HTML', 'CSS', 'PHP', 'SPA', 'PWA', 'CDN', 'CI/CD',
        'AWS', 'GCP', 'VM', 'DB', 'SAAS', 'PAAS', 'IAAS', 'UI/UX'
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