import { GeneratorOptions, WordCategory } from "@/types";

export const creepyWords: WordCategory = {
    adjectives: [
        "Abandoned", "Ancient", "Bleeding", "Cursed", "Dark", "Decaying", "Echoing",
        "Forgotten", "Haunted", "Hollow", "Lost", "Malevolent", "Mysterious", "Occult",
        "Phantom", "Shadowy", "Silent", "Sinister", "Twisted", "Whispered"
    ],
    nouns: [
        "Asylum", "Crypt", "Demon", "Ghost", "Mirror", "Phantom", "Raven", "Shadow",
        "Spirit", "Wraith", "Nightmare", "Specter", "Banshee", "Void", "Darkness",
        "Requiem", "Silence", "Torment", "Vesper", "Wraith"
    ],
    locations: [
        "Abyss", "Catacombs", "Chamber", "Depths", "Domain", "Grove", "Halls",
        "Labyrinth", "Manor", "Mansion", "Maze", "Realm", "Sanctum", "Tomb",
        "Tower", "Valley", "Woods", "Dungeon", "Cavern", "Void"
    ],
    suffixes: [
        "of Despair", "of Doom", "of Shadows", "of the Damned", "of the Dead",
        "of the Fallen", "of the Lost", "of the Night", "of the Void", "of Whispers"
    ]
};

export const defaultOptions: GeneratorOptions = {
    includeLocation: true,
    includeSuffix: false,
    maxLength: 32,
    separator: " "
};

export const appURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const tempUsers = [
    {
        userId: "1",
        username: "Alter EGO",
        isOnline: true,
        lastSeen: new Date("2025-03-24T22:08:59+01:00")
    },
    {
        userId: "2",
        username: "Anon",
        isOnline: false,
        lastSeen: new Date("2025-03-24T21:30:00+01:00")
    },
    {
        userId: "3",
        username: "Ghost",
        isOnline: false,
        lastSeen: new Date("2025-03-24T20:45:00+01:00")
    },
    {
        userId: "4",
        username: "Shadow",
        isOnline: false,
        lastSeen: new Date("2025-03-24T19:15:00+01:00")
    },
    {
        userId: "5",
        username: "Specter",
        isOnline: false,
        lastSeen: new Date("2025-03-24T18:30:00+01:00")
    },
    {
        userId: "6",
        username: "Phantom",
        isOnline: false,
        lastSeen: new Date("2025-03-24T17:45:00+01:00")
    },
    
]