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