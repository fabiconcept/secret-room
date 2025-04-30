import { WordCategory } from "@/types";

// CREEPY/HORROR THEME
const creepyWords: WordCategory = {
    adjectives: [
        "Abandoned", "Ancient", "Bleeding", "Cursed", "Dark", "Decaying", "Echoing",
        "Forgotten", "Haunted", "Hollow", "Lost", "Malevolent", "Mysterious", "Occult",
        "Phantom", "Shadowy", "Silent", "Sinister", "Twisted", "Whispered",
        "Abyssal", "Accursed", "Arcane", "Baleful", "Banished", "Bewitched", "Blighted",
        "Bloodied", "Buried", "Cadaverous", "Callous", "Cavernous", "Charnel", "Chilling",
        "Cobwebbed", "Condemned", "Corrupted", "Crawling", "Creaking", "Crumbling",
        "Cryptic", "Damned", "Darkness", "Deathlike", "Decrepit", "Demented", "Demonic",
        "Desecrated", "Desolate", "Diabolical", "Dismal", "Doomed", "Dreadful", "Dreary",
        "Eldritch", "Eerie", "Enigmatic", "Entombed", "Ethereal", "Evil", "Expired",
        "Faded", "Festering", "Forbidden", "Foreboding", "Forsaken", "Foul", "Fractured",
        "Frightful", "Frozen", "Funereal", "Ghastly", "Ghostly", "Ghoulish", "Gloomy",
        "Gnarled", "Grim", "Grotesque", "Gruesome", "Hellish", "Hexed", "Hideous",
        "Howling", "Infernal", "Insidious", "Lightless", "Looming", "Lurking", "Macabre",
        "Malignant", "Mangled", "Morbid", "Moribund", "Murky", "Necrotic", "Nefarious",
        "Neglected", "Nightmarish", "Noxious", "Obscure", "Ominous", "Otherworldly",
        "Pale", "Paranormal", "Peculiar", "Petrified", "Poisonous", "Profane", "Putrid",
        "Ravaged", "Restless", "Rotting", "Ruined", "Savage", "Scarred", "Screaming",
        "Sepulchral", "Shattered", "Shrieking", "Shrouded", "Skeletal", "Spectral",
        "Spellbound", "Stygian", "Sunless", "Supernatural", "Tainted", "Tormented",
        "Tortured", "Unhallowed", "Unholy", "Unliving", "Unnatural", "Unsettling",
        "Vengeful", "Vile", "Wailing", "Wicked", "Withered", "Wretched"
    ],
    nouns: [
        "Asylum", "Crypt", "Demon", "Ghost", "Mirror", "Phantom", "Raven", "Shadow",
        "Spirit", "Wraith", "Nightmare", "Specter", "Banshee", "Void", "Darkness",
        "Requiem", "Silence", "Torment", "Vesper", "Wraith",
        "Aberration", "Abomination", "Apparition", "Atrocity", "Bane", "Banshee",
        "Beast", "Blood", "Bone", "Brain", "Cadaver", "Casket", "Chasm", "Coffin",
        "Corpse", "Crow", "Cultist", "Curse", "Death", "Delusion", "Despair", "Devil",
        "Dirge", "Doom", "Doppelganger", "Dread", "Ectoplasm", "Entity", "Epitaph",
        "Eulogy", "Exhumation", "Fiend", "Fog", "Gargoyle", "Ghoul", "Gloom", "Gore",
        "Grave", "Grimoire", "Hag", "Hangman", "Harbinger", "Harpy", "Horror", "Howl",
        "Imp", "Incantation", "Infection", "Infestation", "Keeper", "Leviathan", "Lich",
        "Lunar", "Malady", "Malice", "Manipulation", "Masque", "Mausoleum", "Medium",
        "Miasma", "Misery", "Monstrosity", "Moon", "Mortician", "Mummy", "Necromancer",
        "Necrosis", "Nemesis", "Netherworld", "Oblivion", "Omen", "Parasite", "Pestilence",
        "Poltergeist", "Possession", "Presence", "Priest", "Purgatory", "Reaper", "Revenant",
        "Ritual", "Sacrifice", "Scourge", "Seance", "Sewers", "Shade", "Shriek", "Skeleton",
        "Skull", "Slaughter", "Soul", "Specter", "Spell", "Spider", "Talon", "Terror",
        "Thirst", "Threshold", "Tomb", "Trance", "Umbra", "Undertaker", "Vampire", "Venom",
        "Vermin", "Vigil", "Warlock", "Wendigo", "Witch", "Wolf", "Wyrm", "Zombie"
    ],
    locations: [
        "Abyss", "Catacombs", "Chamber", "Depths", "Domain", "Grove", "Halls",
        "Labyrinth", "Manor", "Mansion", "Maze", "Realm", "Sanctum", "Tomb",
        "Tower", "Valley", "Woods", "Dungeon", "Cavern", "Void",
        "Altar", "Asylum", "Attic", "Barrow", "Belfry", "Bog", "Boneyard", "Burrow",
        "Castle", "Cemetery", "Chapel", "Charnel House", "Church", "Cistern", "Citadel",
        "Clearing", "Cliffs", "Cottage", "Courtyard", "Crevasse", "Crossroads", "Crypt",
        "Dell", "Den", "Estate", "Factory", "Fen", "Field", "Forest", "Fortress", "Gallow",
        "Garden", "Gate", "Graveyard", "Greenhouse", "Grotto", "Harbor", "Haven", "Heath",
        "Heights", "Hideout", "Hill", "Hollow", "Hospital", "House", "Hut", "Island",
        "Altar", "Asylum", "Attic", "Barrow", "Belfry", "Bog", "Boneyard", "Burrow",
        "Castle", "Cemetery", "Chapel", "Charnel House", "Church", "Cistern", "Citadel",
        "Clearing", "Cliffs", "Cottage", "Courtyard", "Crevasse", "Crossroads", "Crypt",
        "Dell", "Den", "Estate", "Factory", "Fen", "Field", "Forest", "Fortress", "Gallow",
        "Garden", "Gate", "Graveyard", "Greenhouse", "Grotto", "Harbor", "Haven", "Heath",
        "Heights", "Hideout", "Hill", "Hollow", "Hospital", "House", "Hut", "Island",
        "Keep", "Kingdom", "Lair", "Lake", "Library", "Lighthouse", "Lodge", "Marsh",
        "Mausoleum", "Mine", "Monastery", "Monument", "Moor", "Morgue", "Mountain",
        "Necropolis", "Obelisk", "Observatory", "Ossuary", "Palace", "Parish", "Passage",
        "Path", "Peak", "Pit", "Prison", "Pyramid", "Ravine", "Ridge", "Ruin", "Sanctum",
        "School", "Sepulcher", "Sewer", "Shadowland", "Shrine", "Sepulcher", "Steeple",
        "Stronghold", "Study", "Swamp", "Temple", "Threshold", "Tunnel", "Underworld",
        "Vault", "Village", "Wasteland", "Well", "Wetlands", "Wilderness"
    ]
};

// CYBERPUNK/TECH THEME
const cyberpunkWords: WordCategory = {
    adjectives: [
        "Automated", "Augmented", "Binary", "Chrome", "Coded", "Corrupted", "Cyber",
        "Digital", "Electric", "Encrypted", "Glitched", "Hacked", "Holographic", "Malware",
        "Mechanized", "Neon", "Neural", "Quantum", "Synthetic", "Technical", "Virtual",
        "Wired", "Zero-Day", "Adaptive", "Algorithmic", "Altered", "Anomalous", "Archived",
        "Artificial", "Autoexec", "Bionic", "Biotechnical", "Blacklisted", "Blockchain",
        "Bootlegged", "Calibrated", "Circuit", "Clinical", "Cloud", "Compromised", "Console",
        "Core", "Cortical", "Cryptic", "Data-Driven", "Decrypted", "Derezed", "Divergent",
        "Dynamic", "Embedded", "Enhanced", "Executable", "Fabricated", "Firewall", "Fragmented",
        "Frictionless", "Fused", "Glowing", "Grid", "High-Frequency", "Hyper", "Immersive",
        "Implanted", "Indexed", "Industrial", "Integrated", "Intelligent", "Interface",
        "Ionized", "Kinetic", "Laser", "Lithium", "Loaded", "Logic", "Low-Res", "Luminous",
        "Mainframe", "Matrix", "Mesh", "Meta", "Modded", "Modular", "Nano", "Net", "Network",
        "Neural-Linked", "Nucleic", "Offline", "Optical", "Optimized", "Overclocked",
        "Parallel", "Patched", "Peripheral", "Pixelated", "Plasma", "Polymorphic", "Procedural",
        "Programmed", "Projected", "Proxy", "Replicated", "Retrofitted", "Rogue", "Sentient",
        "Serialized", "Smart", "Static", "Stealth", "Streaming", "Surged", "Tactical",
        "Technologic", "Terminal", "Threaded", "Transient", "Trojan", "Ultrasonic", "Unstable",
        "Upgraded", "Vectored", "Viral", "Volatile", "Wetware", "Wireless"
    ],
    nouns: [
        "Algorithm", "Android", "Bandwidth", "Binary", "Bioware", "Bot", "Chipset", "Circuit",
        "Code", "Console", "Core", "Cortex", "Cyberspace", "Data", "Decrypt", "Droid", "Drone",
        "Encryption", "Firewall", "Framework", "Grid", "Hack", "Hardware", "Hologram", "Interface",
        "Kernel", "Mainframe", "Malware", "Matrix", "Memory", "Modem", "Module", "Network",
        "Neural-Net", "Node", "Pixel", "Protocol", "Proxy", "Pulse", "Router", "Server",
        "Signal", "Software", "System", "Terminal", "Vector", "Virus", "AI", "Arc", "Array",
        "Assembler", "Auxiliary", "Backdoor", "Beacon", "Beast", "Bit", "Blade", "Blocker",
        "Breach", "Buffer", "Bug", "Byte", "Cache", "Carrier", "Catalyst", "Cell", "Channel",
        "Cipher", "Cluster", "Command", "Compiler", "Conduit", "Constructor", "Converter",
        "Coolant", "Cryptid", "Current", "Cyberdeck", "Daemon", "Datastream", "Defrag",
        "Diagnostics", "Diode", "Disk", "Distortion", "Emitter", "Engine", "Entity",
        "Execution", "Exploit", "Extractor", "Fabricator", "Failsafe", "Fiber", "Field",
        "Fixer", "Flow", "Frequency", "Function", "Fuse", "Gateway", "Generator", "Ghost",
        "Glass", "Glitch", "Hardline", "Host", "Hub", "Hyper-Threading", "Icon", "Implant",
        "Impulse", "Index", "Infiltrator", "Instance", "Jack", "Key", "Laser", "Link",
        "Loadout", "Lobe", "Logic-Bomb", "Loop", "Manifest", "Mechanism", "Mesh", "Mirror",
        "Mod", "Monitor", "Motherboard", "Nanite", "Nerve", "Net-Runner", "Network", "Neuron",
        "Nexus", "Oscillator", "Override", "Parasite", "Patch", "Path", "Pattern", "Phase",
        "Port", "Processor", "Projection", "Pulse", "Queue", "Ray", "Receptor", "Reflex",
        "Registry", "Relay", "Replicant", "Rig", "Runtime", "Shard", "Shell", "Slicer",
        "Socket", "Source", "Spike", "Stack", "Stream", "Surge", "Switch", "Synthware",
        "Thread", "Trace", "Transceiver", "Transformer", "Transistor", "Transmission", "Trojan",
        "Uplink", "Utility", "Void", "Wave", "Wire", "Worm", "Zone"
    ],
    locations: [
        "Arcade", "Archive", "Arena", "Array", "Bunker", "Complex", "Compound", "Core",
        "Corridor", "Database", "Dimension", "District", "Dome", "Factory", "Fortress",
        "Gateway", "Grid", "Habitat", "Hub", "Junction", "Lab", "Matrix", "Megaplex",
        "Network", "Nexus", "Platform", "Port", "Realm", "Sector", "Station", "Stronghold",
        "System", "Terminal", "Tower", "Wasteland", "Zone", "Accelerator", "Access-Point",
        "Alley", "Architecture", "Atmospheric", "Backbone", "Bank", "Bar", "Bazaar", "Block",
        "Boulevard", "Bridge", "Cage", "Capital", "Center", "Chamber", "City", "Cloud",
        "Cluster", "Colony", "Commons", "Control-Room", "Convergence", "Corner", "Cube",
        "Cybersphere", "Datacenter", "Deadzone", "Den", "Drive", "Dump", "Edge", "Elevator",
        "Enclave", "Engine-Room", "Exchange", "Field", "Floor", "Forge", "Frame", "Fringe",
        "Frontier", "Gallery", "Garage", "Garden", "Geodesic", "Greenhouse", "Hangar",
        "Haven", "Headquarters", "Highway", "Hive", "Hollow", "Hotspot", "Hyperspace",
        "Infrastructure", "Installation", "Institute", "Intersection", "Kernel", "Level",
        "Library", "Line", "Link", "Lounge", "Mall", "Market", "Memory-Bank", "Metropolis",
        "Mine", "Module", "Motherboard", "Node", "Observatory", "Offline-Zone", "Outpost",
        "Palace", "Partition", "Passage", "Pipeline", "Plaza", "Pocket", "Pool", "Prison",
        "Processing", "Projection", "Proxy", "Pulse", "Quadrant", "Quarantine", "Quarter",
        "Recharge", "Repository", "Research-Center", "Rift", "Ring", "Room", "Root", "Safe-House",
        "Satellite", "Screen", "Server-Farm", "Shard", "Shelter", "Shop", "Site", "Skies",
        "Skyscraper", "Slum", "Space", "Stack", "Street", "Structure", "Subnet", "Superstructure",
        "Syndicate", "Throughput", "Throughway", "Transit", "Underground", "Uplink", "Vault",
        "Vector", "Void", "Warehouse", "Workshop", "Yard"
    ]
};

// MYSTICAL/FANTASY THEME
const fantasyWords: WordCategory = {
    adjectives: [
        "Arcane", "Astral", "Celestial", "Draconic", "Enchanted", "Ethereal", "Fabled",
        "Forgotten", "Hallowed", "Immortal", "Legendary", "Magical", "Majestic", "Mythical",
        "Mystical", "Primordial", "Sacred", "Sorcerous", "Spectral", "Whispering", "Ancient",
        "Awakened", "Bewitched", "Blessed", "Boundless", "Breathtaking", "Brilliant", "Charmed",
        "Conjured", "Cosmic", "Crystal", "Dazzling", "Delphic", "Divine", "Dreamlike",
        "Elemental", "Elven", "Empyreal", "Empyrean", "Enigmatic", "Enlightened", "Epic",
        "Esoteric", "Everlasting", "Exalted", "Fae", "Fantastical", "Feywild", "Flickering",
        "Floating", "Forbidden", "Galactic", "Glimmering", "Golden", "Heavenly", "Heroic",
        "Hidden", "Illuminated", "Illusory", "Ineffable", "Infinite", "Invisible", "Iridescent",
        "Lustrous", "Lunar", "Luminous", "Mercurial", "Mesmerizing", "Metaphysical", "Miraculous",
        "Moonlit", "Mythic", "Numinous", "Occult", "Olympian", "Otherworldly", "Phantasmal",
        "Prismatic", "Prophetic", "Radiant", "Resplendent", "Revered", "Runic", "Sanctified",
        "Seraphic", "Shimmering", "Silvery", "Solar", "Spellbound", "Starlit", "Stellar",
        "Supernatural", "Sylvan", "Talisman", "Transcendent", "Transmuted", "Umbral",
        "Unearthly", "Unfathomable", "Veiled", "Venerable", "Verdant", "Void-touched",
        "Wondrous", "Wyrd"
    ],
    nouns: [
        "Aether", "Archon", "Bard", "Beast", "Cleric", "Dragon", "Druid", "Elemental",
        "Enchanter", "Fairy", "Griffin", "Guardian", "Knight", "Mage", "Oracle", "Phoenix",
        "Sage", "Sorcerer", "Unicorn", "Wizard", "Abjurer", "Alchemist", "Angel", "Apostle",
        "Apparition", "Artifact", "Avatar", "Banisher", "Beholder", "Blade", "Blessing",
        "Blood", "Caller", "Champion", "Channeler", "Charm", "Chimera", "Chronicle", "Colossus",
        "Conjurer", "Conqueror", "Construct", "Convergence", "Creature", "Crystal", "Curator",
        "Curse", "Dancer", "Defender", "Deity", "Demon", "Destiny", "Devotion", "Dimension",
        "Discovery", "Diviner", "Dream", "Dryad", "Effigy", "Eidolon", "Elixir", "Emanation",
        "Embodiment", "Emperor", "Energy", "Entity", "Epiphany", "Essence", "Evocation",
        "Familiar", "Fate", "Feather", "Fire", "Force", "Genesis", "Glade", "Glory", "Golem",
        "Grace", "Harbinger", "Healer", "Herald", "Heritage", "Hero", "Honor", "Hydra",
        "Illusion", "Incantation", "Keeper", "Key", "Kraken", "Legacy", "Legend", "Leviathan",
        "Lich", "Light", "Lore", "Mantra", "Medusa", "Memory", "Metamorph", "Mind", "Miracle",
        "Mirage", "Monolith", "Mystery", "Myth", "Nexus", "Nymph", "Oath", "Omen", "Paladin",
        "Paragon", "Path", "Pilgrim", "Prophecy", "Protector", "Purity", "Quest", "Quill",
        "Relic", "Restoration", "Revelation", "Reverie", "Riddle", "Ritual", "Rune", "Scroll",
        "Seeker", "Seer", "Sentinel", "Seraph", "Serpent", "Shade", "Shift", "Sigil", "Song",
        "Soul", "Specter", "Spell", "Spirit", "Star", "Summoner", "Symbol", "Talisman", "Templar",
        "Tempest", "Titan", "Tome", "Totem", "Transmuter", "Veil", "Vessel", "Vision", "Vow",
        "Warden", "Warlock", "Weaver", "Will", "Wind", "Wyrmling", "Zephyr"
    ],
    locations: [
        "Altar", "Castle", "Cloister", "Covenant", "Fane", "Glade", "Grove", "Haven",
        "Kingdom", "Monastery", "Oasis", "Outpost", "Palace", "Sanctuary", "Shrine", "Temple",
        "Throne", "Village", "Wilderness", "Ziggurat", "Abbey", "Acropolis", "Amphitheater",
        "Archipelago", "Arena", "Ascendancy", "Ashlands", "Astral-Plane", "Atheneum", "Aurora",
        "Avenue", "Basin", "Battlefield", "Bay", "Bayou", "Beacon", "Bazaar", "Beach",
        "Belfry", "Bluff", "Borderland", "Borough", "Boundary", "Breach", "Bridge", "Brook",
        "Burrow", "Cairn", "Caldera", "Camp", "Canal", "Canyon", "Cape", "Cascade", "Cataract",
        "Cathedral", "Causeway", "Circle", "Cirque", "Citadel", "Clearing", "Coast", "Colonnade",
        "Column", "Commons", "Confluence", "Copse", "Cove", "Covenant", "Cradle", "Crag",
        "Creek", "Crescent", "Crest", "Dale", "Defile", "Delta", "Desert", "Domain", "Dome",
        "Dominion", "Drift", "Dunes", "Dyke", "Encampment", "Enclave", "Escarpment", "Esplanade",
        "Estuary", "Expanse", "Eye", "Eyot", "Falls", "Fane", "Farmland", "Fen", "Ferry",
        "Field", "Fjord", "Flow", "Ford", "Forest", "Forge", "Fountain", "Frontier", "Garden",
        "Gate", "Gateway", "Glacier", "Glen", "Gorge", "Grotto", "Headland", "Hearth", "Heath",
        "Hedge", "Heights", "Highlands", "Highway", "Hill", "Hollow", "Homestead", "Horizon",
        "Icefield", "Inlet", "Islet", "Junction", "Knoll", "Lake", "Landing", "Lighthouse",
        "Lowlands", "Marsh", "Meadow", "Mesa", "Milestone", "Mill", "Mire", "Moat", "Moor",
        "Moorland", "Mound", "Mountain", "Neck", "Nest", "Obelisk", "Ocean", "Orchard",
        "Outlook", "Overlook", "Pass", "Passage", "Path", "Peak", "Peninsula", "Pinnacle",
        "Plateau", "Plaza", "Pond", "Pool", "Portal", "Prairie", "Precipice", "Promontory",
        "Pyramid", "Quay", "Rapids", "Ravine", "Reef", "Refuge", "Reserve", "Reservoir",
        "Ridge", "Rift", "River", "Road", "Rock", "Rookery", "Rotunda", "Ruins", "Savanna",
        "Scarp", "Sea", "Seaside", "Shallows", "Shore", "Skyline", "Slope", "Sound", "Spire",
        "Spring", "Steppe", "Strait", "Stream", "Summit", "Swamp", "Tarn", "Terrace", "Thicket",
        "Tide", "Tor", "Trail", "Vale", "Valley", "Vista", "Wall", "Waste", "Waterfall",
        "Waters", "Waypoint", "Well", "Wetland", "Wharf", "Wilds", "Wood", "Woodland", "Yard"
    ]
};

// MYTHOLOGY THEME
const mythologyWords: WordCategory = {
    adjectives: [
        "Ancestral", "Blessed", "Celestial", "Divine", "Elysian", "Fated", "Godly", "Heroic", "Immortal",
        "Judging", "Kindred", "Legendary", "Mythic", "Numinous", "Olympian", "Primordial", "Quintessential",
        "Revered", "Sacred", "Titanic", "Ancient", "Boundless", "Cosmic", "Deific", "Ethereal", "Fabled",
        "Golden", "Hallowed", "Illustrious", "Jovian", "Karmic", "Luminous", "Mystic", "Noble", "Oracular",
        "Pantheon", "Queenly", "Radiant", "Sovereign", "Transcendent"
    ],
    nouns: [
        "Aegis", "Bident", "Chalice", "Deity", "Elixir", "Fate", "God", "Hero", "Idol", "Justice",
        "Kraken", "Labyrinth", "Muse", "Nectar", "Oracle", "Pantheon", "Quest", "Relic", "Siren", "Titan",
        "Altar", "Blade", "Chimera", "Demigod", "Element", "Furies", "Grail", "Hydra", "Immortal",
        "Journey", "Kin", "Leviathan", "Minotaur", "Nemesis", "Odyssey", "Prophecy", "Quiver", "Realm",
        "Serpent", "Trident"
    ],
    locations: [
        "Abyss", "Battlefield", "Court", "Domain", "Elysium", "Firmament", "Garden", "Heaven", "Isles",
        "Judgment", "Kingdom", "Labyrinth", "Mountain", "Netherworld", "Olympus", "Paradise", "Realm",
        "Sanctuary", "Temple", "Underworld", "Arcadia", "Bifrost", "Cosmos", "Dominion", "Empyrean",
        "Fields", "Grove", "Hall", "Inferno", "Journey", "Kailash", "Limbo", "Mead-hall", "Nexus",
        "Oasis", "Pantheon", "Quarters", "River", "Sea", "Throne"
    ]
};

// ANIME THEME (Including Attack on Titan references)
const animeWords: WordCategory = {
    adjectives: [
        "Awakened", "Brave", "Celestial", "Divine", "Eternal", "Fierce", "Gleaming", "Hidden", "Immortal",
        "Jade", "Karmic", "Legendary", "Mighty", "Noble", "Ominous", "Phantom", "Radiant", "Sacred",
        "Thunderous", "Ultimate", "Absolute", "Berserk", "Colossal", "Demonic", "Ethereal", "Fallen",
        "Gigantic", "Heroic", "Imperial", "Jaded", "Kinetic", "Liberated", "Majestic", "Nihilistic",
        "Onyx", "Primordial", "Quintet", "Rogue", "Shadowy", "Titanic"
    ],
    nouns: [
        "Alchemist", "Blade", "Champion", "Dragon", "Elemental", "Fury", "Guardian", "Hunter", "Idol",
        "Jinx", "Knight", "Legend", "Mage", "Ninja", "Oni", "Phantom", "Quest", "Ronin", "Samurai",
        "Titan", "Avatar", "Behemoth", "Colossus", "Daimyo", "Exorcist", "Familiar", "Geass", "Hero",
        "Invocation", "Jaegers", "Kami", "Lotus", "Mecha", "Nekoma", "Overlord", "Prodigy", "Quincy",
        "Reaper", "Shinobi", "Tsubasa"
    ],
    locations: [
        "Academy", "Battlefield", "Castle", "Domain", "Empire", "Fortress", "Garden", "Haven", "Island",
        "Junction", "Kingdom", "Labyrinth", "Mountain", "Nexus", "Oasis", "Palace", "Realm", "Sanctuary",
        "Temple", "Utopia", "Arena", "Barracks", "Colosseum", "Dojo", "Eldian", "Forest", "Gate",
        "Hideout", "Inner-Wall", "Jungle", "Karasuno", "Leaf-Village", "Marley", "Nest", "Outer-Wall",
        "Paradis", "Quarters", "Rose-Wall", "Sina-Wall", "Territory"
    ]
};

// GAME OF THRONES / MEDIEVAL THEME
const medievalWords: WordCategory = {
    adjectives: [
        "Ancient", "Bannered", "Crowned", "Dire", "Embattled", "Feudal", "Golden", "Hallowed", "Iron",
        "Jousting", "Knighted", "Liege", "Mighty", "Noble", "Oathbound", "Pious", "Royal", "Stark",
        "Targaryen", "Unyielding", "Ancestral", "Broken", "Crimson", "Dothraki", "Exiled", "Forgotten",
        "Grey", "High-born", "Icy", "Just", "Kingly", "Lannister", "Masked", "Northern", "Ordained",
        "Proud", "Resilient", "Sworn", "True-born", "Valyrian"
    ],
    nouns: [
        "Ancestral", "Banner", "Crown", "Dragon", "Eagle", "Falcon", "Ghost", "Honor", "Iron", "Joust",
        "King", "Lion", "Maester", "Night", "Oath", "Prince", "Queen", "Raven", "Sword", "Throne",
        "Army", "Blade", "Crow", "Direwolf", "Exile", "Fire", "Guard", "Hand", "Ironborn", "Justice",
        "Knight", "Lord", "Maester", "Nobility", "Overlord", "Protector", "Queensguard", "Realm",
        "Sentinel", "Tower"
    ],
    locations: [
        "Arbor", "Barrow", "Castle", "Dreadfort", "Eyrie", "Fortress", "Godswood", "Highgarden", "Inn",
        "Junction", "Kingdom", "Landing", "Moat", "North", "Outpost", "Pinnacle", "Quarters", "Reach",
        "Stormlands", "Tower", "Armory", "Blackwater", "Citadel", "Dragonstone", "Essos", "Freehold",
        "Ghostgrass", "Harrenhal", "Ironhold", "Jade-Sea", "Kingsgrave", "Lannisport", "Meereen",
        "Nightfort", "Oldtown", "Pyke", "Queenscrown", "Riverrun", "Sunspear", "Winterfell"
    ]
};

// NATURE/ELEMENTAL THEME
const natureWords: WordCategory = {
    adjectives: [
        "Ancient", "Blazing", "Crystal", "Desolate", "Emerald", "Flowing", "Glacial", "Harmonious",
        "Illuminated", "Jade", "Kinetic", "Lush", "Magnetic", "Natural", "Oceanic", "Primeval", "Quaking",
        "Radiant", "Serene", "Tempestuous", "Azure", "Boundless", "Cascading", "Dormant", "Ethereal",
        "Fertile", "Golden", "Hallowed", "Icy", "Jungle", "Kaleidoscopic", "Lunar", "Misty", "Northern",
        "Obsidian", "Pristine", "Quiet", "Resplendent", "Sylvan", "Tranquil"
    ],
    nouns: [
        "Aether", "Blossom", "Cascade", "Delta", "Eclipse", "Flame", "Geyser", "Hurricane", "Inferno",
        "Jungle", "Karst", "Leaf", "Mountain", "Nova", "Ocean", "Peak", "Quartz", "River", "Storm",
        "Tempest", "Aurora", "Breeze", "Comet", "Dew", "Earth", "Forest", "Glade", "Horizon", "Ice",
        "Jasper", "Kelp", "Lagoon", "Meteor", "Nebula", "Opal", "Prairie", "Quill", "Ravine", "Sunbeam",
        "Tundra"
    ],
    locations: [
        "Archipelago", "Basin", "Canyon", "Dell", "Estuary", "Fjord", "Glacier", "Highlands", "Isthmus",
        "Jungle", "Knoll", "Lagoon", "Mesa", "Nexus", "Oasis", "Peninsula", "Quarry", "Rapids", "Savanna",
        "Tundra", "Atoll", "Bayou", "Clearing", "Delta", "Escarpment", "Forest", "Gorge", "Heath",
        "Island", "Jungle", "Karst", "Lowlands", "Marsh", "Northlands", "Overlook", "Plateau", "Quagmire",
        "Rainforest", "Steppe", "Valley"
    ]
};

// MUSIC/ARTS THEME
const artsWords: WordCategory = {
    adjectives: [
        "Acoustic", "Baroque", "Classical", "Dreamy", "Ethereal", "Fanciful", "Graceful", "Harmonic",
        "Impressionist", "Jazz", "Kinetic", "Lyrical", "Melodic", "Nostalgic", "Operatic", "Poetic",
        "Rhythmic", "Surreal", "Thematic", "Vibrant", "Abstract", "Balletic", "Chromatic", "Dramatic",
        "Eclectic", "Flamboyant", "Graphic", "Hypnotic", "Inspired", "Jubilant", "Kaleidoscopic",
        "Luminous", "Modernist", "Nuanced", "Orchestral", "Passionate", "Quintessential", "Resonant",
        "Symphonic", "Theatrical"
    ],
    nouns: [
        "Aria", "Ballad", "Canvas", "Dirge", "Ensemble", "Fugue", "Gallery", "Harmony", "Interlude",
        "Jazz", "Keynote", "Libretto", "Melody", "Nocturne", "Overture", "Prelude", "Quartet", "Rhapsody",
        "Sonata", "Tempo", "Anthem", "Ballet", "Chorus", "Duet", "Echo", "Fanfare", "Glissando", "Hymn",
        "Improvisation", "Jubilee", "Karaoke", "Lullaby", "Madrigal", "Note", "Opera", "Percussion",
        "Quintet", "Requiem", "Symphony", "Toccata"
    ],
    locations: [
        "Amphitheater", "Ballroom", "Conservatory", "Den", "Exhibition", "Forum", "Gallery", "Hall",
        "Institute", "Jamboree", "Kiosk", "Loft", "Museum", "Nexus", "Opera", "Pavilion", "Quarter",
        "Recital", "Studio", "Theater", "Atelier", "Broadway", "Chamber", "Dome", "Ensemble", "Festival",
        "Grand-Hall", "Haunt", "Ivory-Tower", "Junction", "Konzerthaus", "Lounge", "Mezzanine", "Nook",
        "Orchestra", "Parlor", "Quartet", "Rehearsal", "Stage", "Venue"
    ]
};

// TECH STARTUP/BUSINESS THEME
const businessWords: WordCategory = {
    adjectives: [
        "Agile", "Bold", "Connected", "Disruptive", "Efficient", "Forward", "Global", "Hyperscale",
        "Innovative", "Joint", "Key", "Lean", "Modern", "Networked", "Optimized", "Proactive", "Quantum",
        "Responsive", "Strategic", "Transformative", "Adaptive", "Breakthrough", "Cutting-edge", "Dynamic",
        "Emergent", "Flexible", "Groundbreaking", "Holistic", "Integrated", "Jumpstart", "Kinetic",
        "Leading", "Maneuverable", "Novel", "Organic", "Progressive", "Quick", "Robust", "Streamlined",
        "Unified"
    ],
    nouns: [
        "Accelerator", "Blueprint", "Capital", "Disruption", "Enterprise", "Framework", "Growth", "Hub",
        "Innovation", "Journey", "Keystone", "Leadership", "Momentum", "Network", "Opportunity", "Platform",
        "Quantum", "Revenue", "Strategy", "Transformation", "Alliance", "Benchmark", "Catalyst", "Dividend",
        "Ecosystem", "Frontier", "Groundwork", "Horizon", "Initiative", "Junction", "Kickoff", "Leverage",
        "Matrix", "Nexus", "Outcome", "Pipeline", "Quotient", "Resource", "Synergy", "Traction"
    ],
    locations: [
        "Accelerator", "Base", "Campus", "District", "Exchange", "Factory", "Garage", "Hub", "Incubator",
        "Junction", "Kitchen", "Lab", "Marketplace", "Nexus", "Office", "Park", "Quarter", "Ranch",
        "Suite", "Tower", "Arena", "Boardroom", "Complex", "Domain", "Enterprise", "Foundry", "Grid",
        "Headquarters", "Innovation-center", "Junction", "Kernel", "Lounge", "Matrix", "Network",
        "Outpost", "Platform", "Quarters", "Realm", "Studio", "Valley"
    ]
};

// COSMIC/SPACE THEME
const cosmicWords: WordCategory = {
    adjectives: [
        "Astral", "Binary", "Celestial", "Distant", "Elliptical", "Frozen", "Galactic", "Heliospheric",
        "Interstellar", "Jovian", "Kinetic", "Luminous", "Martian", "Nebular", "Orbital", "Pulsar",
        "Quasar", "Radiant", "Solar", "Translunar", "Astronomical", "Beckoning", "Cosmic", "Dark",
        "Expansive", "Finite", "Gravitational", "Hyperspace", "Infinite", "Journey", "Kuiper", "Lunar",
        "Magnetic", "Nuclear", "Oort", "Planetary", "Quantum", "Red-shifted", "Stellar", "Universal"
    ],
    nouns: [
        "Asteroid", "Beacon", "Comet", "Dust", "Eclipse", "Flare", "Galaxy", "Horizon", "Interlude",
        "Jet", "Kilometer", "Light", "Meteor", "Nebula", "Orbit", "Pulsar", "Quasar", "Radiation",
        "Star", "Telescope", "Aurora", "Black-hole", "Cosmos", "Dwarf", "Energy", "Firmament", "Gravity",
        "Heliosphere", "Ion", "Jupiter", "Kepler", "Lens", "Magnetar", "Nova", "Oblivion", "Planet",
        "Quadrant", "Relativity", "Supernova", "Universe"
    ],
    locations: [
        "Anomaly", "Belt", "Cloud", "Dimension", "Event-horizon", "Field", "Gate", "Halo", "Innerspace",
        "Junction", "Kuiper", "Latitude", "Magnetosphere", "Nebula", "Orbit", "Prominence", "Quadrant",
        "Ring", "Space", "Trench", "Aperture", "Breach", "Corona", "Disc", "Expanse", "Fold", "Gravity-well",
        "Heliopause", "Interzone", "Jump-point", "Kelvin-radius", "Lagrange", "Magnitude", "Null-space",
        "Observatory", "Periphery", "Quantum-field", "Rift", "Singularity", "Trajectory"
    ]
};

// GAMING/ESPORTS THEME
const gamingWords: WordCategory = {
    adjectives: [
        "Acclaimed", "Brutal", "Competitive", "Deluxe", "Elite", "Flawless", "Godlike", "Hardcore",
        "Intense", "Juggling", "Kinetic", "Legendary", "Maxed", "Notorious", "Overpowered", "Pro",
        "Quick", "Raging", "Skilled", "Tactical", "Agile", "Blazing", "Critical", "Devastating", "Epic",
        "Frantic", "Glorious", "Hyper", "Immersive", "Juggernaut", "Keen", "Lethal", "Masterful",
        "Nimble", "Optimal", "Precise", "Quickscope", "Relentless", "Strategic", "Ultimate"
    ],
    nouns: [
        "Achievement", "Boss", "Champion", "Domination", "Esport", "Frag", "Guild", "Highscore", "Item",
        "Juggernaut", "Kill", "Level", "Meta", "Noob", "Objective", "Player", "Quest", "Raid", "Score",
        "Team", "Arena", "Battle", "Combo", "Damage", "Elite", "Flag", "Grind", "Headshot", "Instance",
        "Joystick", "Keyboard", "Leaderboard", "Match", "Nexus", "Opponent", "Point", "Queue", "Round",
        "Spawn", "Tournament"
    ],
    locations: [
        "Arena", "Battlefield", "Checkpoint", "Dungeon", "Encampment", "Fortress", "Guild", "Hideout",
        "Instance", "Junction", "Kingdom", "Lobby", "Map", "Nexus", "Outpost", "Platform", "Quest",
        "Realm", "Stronghold", "Town", "Arcade", "Base", "Console", "Den", "Environment", "Field",
        "Ground", "Hub", "Intersection", "Jungle", "Keep", "Lane", "Maze", "Nest", "Objective", "Point",
        "Quarters", "Respawn", "Spawn", "Turf"
    ]
};

// LUXURY/PREMIUM THEME
const luxuryWords: WordCategory = {
    adjectives: [
        "Affluent", "Bespoke", "Curated", "Deluxe", "Elegant", "Fine", "Grand", "Haute", "Immaculate",
        "Jeweled", "Kingly", "Lavish", "Majestic", "Noble", "Opulent", "Prestigious", "Quintessential",
        "Refined", "Sumptuous", "Tailored", "Aristocratic", "Brilliant", "Cultivated", "Distinguished",
        "Exquisite", "Fashionable", "Gilded", "Handcrafted", "Imperial", "Judicial", "Karat", "Lustrous",
        "Magnificent", "Notable", "Ornate", "Polished", "Quality", "Regal", "Sophisticated", "Timeless"
    ],
    nouns: [
        "Affluence", "Brilliance", "Craftsmanship", "Diamond", "Estate", "Finesse", "Grandeur", "Heritage",
        "Insignia", "Jewelry", "Kingdom", "Legacy", "Majesty", "Nobility", "Opulence", "Prestige",
        "Quintessence", "Refinement", "Splendor", "Treasure", "Artistry", "Boutique", "Collection",
        "Distinction", "Elegance", "Fortune", "Gold", "Honor", "Icon", "Jade", "Karat", "Luxury",
        "Masterpiece", "Noblesse", "Ornament", "Privilege", "Quality", "Regalia", "Silk", "Taste"
    ],
    locations: [
        "Atelier", "Boutique", "Chateau", "Domain", "Estate", "Flagship", "Gallery", "Haven", "Inn",
        "Jardin", "Kingdom", "Lounge", "Mansion", "Nexus", "Oasis", "Palace", "Quarter", "Residence",
        "Salon", "Tower", "Arcade", "Boulevard", "Court", "Domicile", "Embassy", "Forum", "Grove",
        "Hall", "Ivory-Tower", "Junction", "Kiosk", "Lodge", "Manor", "Niche", "Observatory", "Pavilion",
        "Quarters", "Retreat", "Suite", "Villa"
    ]
};

export const wordsCategories = [
    creepyWords,
    cyberpunkWords,
    fantasyWords,
    mythologyWords,
    animeWords,
    medievalWords,
    natureWords,
    artsWords,
    businessWords,
    cosmicWords,
    gamingWords,
    luxuryWords
]