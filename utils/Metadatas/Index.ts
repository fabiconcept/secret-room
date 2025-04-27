import { Metadata } from "next";

export const homeMetadata: Metadata = {
    title: 'Secret Room — Anonymous Chat',
    description: "Enter the dark corners of the internet and speak your truth. Secret Room is an anonymous, real-time chat space where conversations are fleeting, honest, and free of consequence.",
    keywords: [
        'anonymous chat',
        'real-time messaging',
        'private chat rooms',
        'fearless conversations',
        'temporary chat',
        'dark web style chat',
        'self-destructing messages',
        'anonymous discussions',
        'chat without fear',
        'secure chat',
        'random chat rooms',
        'private messaging',
        'untraceable chat',
        'honest conversations',
        'temporary server chat',
        'dark web chat'
    ],
    authors: [{name: "Fabiconcept", url: "https://fabiconcept.online"}],
    creator: 'Fabiconcept',
    openGraph: {
        title: 'Secret Room — Anonymous Chat',
        description: "Enter the dark corners of the internet and speak your truth. Secret Room is an anonymous, real-time chat space where conversations are fleeting, honest, and free of consequence.",
        url: 'https://secret-room-orpin.vercel.app',
        locale: 'en_US',
        images: [
            {
                url: 'https://secret-room.sirv.com/snapshots/thumbnail-main.png',
                width: 1200,
                height: 630,
                alt: 'Secret Room Chat Interface',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Secret Room — Anonymous Chat',
        description: 'A dark, fleeting space for unfiltered conversations. Enter now and speak without fear.',
        images: ['https://secret-room.sirv.com/snapshots/thumbnail-main.png'],
    },
    icons: {
        icon: 'https://secret-room.sirv.com/favicon/android-chrome-192x192.png',
        shortcut: 'https://secret-room.sirv.com/favicon/android-chrome-512x512.png',
        apple: 'https://secret-room.sirv.com/favicon/android-chrome-512x512.png',
        other: {
            rel: 'https://secret-room.sirv.com/favicon/favicon.ico',
            url: 'https://secret-room.sirv.com/favicon/favicon.ico',
        },
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};



export const GlobalInviteMetadata: Metadata = {
    title: "Secret Room — Join the Conversation",
    description: "Find your way into the Secret Room. Step inside, meet strangers, speak freely — and disappear without a trace.",
    openGraph: {
        title: "Secret Room — Join Now",
        description: "Enter a world of anonymous, fearless conversations. No sign-ups. No trails. Just pure connection.",
        siteName: "Secret Room",
        images: [
            {
                url: "https://secret-room.sirv.com/snapshots/thumbnail-main.png",
                width: 1200,
                height: 630,
                alt: "Secret Room - Global Invite"
            }
        ],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Secret Room — Join Now",
        description: "Step into the unknown. Speak, listen, and vanish. Secret Room awaits.",
        images: ["https://secret-room.sirv.com/snapshots/thumbnail-main.png"]
    }
};

export const ServerMetadata: Metadata = {
    title: "Secret Room — Live Server",
    description: "You're in. A temporary, anonymous room built for fearless conversations. Speak your mind — the clock is ticking.",
    openGraph: {
        title: "Secret Room — Active Chat",
        description: "Connected in real-time. Anonymous by design. Temporary by nature.",
        siteName: "Secret Room",
        images: [
            {
                url: "https://secret-room.sirv.com/snapshots/thumbnail-main.png",
                width: 1200,
                height: 630,
                alt: "Secret Room Server"
            }
        ],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Secret Room — Chat Live",
        description: "Real-time. Anonymous. Temporary. This is your space to speak without fear.",
        images: ["https://secret-room.sirv.com/snapshots/thumbnail-main.png"]
    }
};

export const PrivateInviteMetadata: Metadata = {
    title: "Secret Room — Private Invite",
    description: "You've been invited to a secret, anonymous chat. One link. One room. One shot at a fearless conversation.",
    openGraph: {
      title: "Secret Room — Private Access",
      description: "A personal invitation to an untraceable, temporary chat room. Speak now or lose your chance.",
      siteName: "Secret Room",
      images: [
        {
          url: "https://secret-room.sirv.com/snapshots/thumbnail-main.png",
          width: 1200,
          height: 630,
          alt: "Secret Room - Private Invite"
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Secret Room — Private Invite",
      description: "One link. One chance. Step into the Secret Room for an honest, anonymous connection.",
      images: ["https://secret-room.sirv.com/snapshots/thumbnail-main.png"]
    }
  };
  