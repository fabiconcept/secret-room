# 🎭 Secret Room - Frontend

**Secret Room** is a fully anonymous, real-time chat app that lets users create temporary servers and invite others to join without revealing their identity. This is the **frontend**, built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Socket.IO**, crafted for speed, privacy, and responsiveness.

> 💡 This project focuses on stateless, anonymous sessions, private invites, smooth real-time messaging, and immersive UI/UX.

---

## 🚀 Features

- 🎨 Beautiful, minimal, **fully mobile-responsive** UI
- 🔐 Complete anonymous user flow — no sign-ups, no names
- 💬 Real-time chat with **Socket.IO**
- 📁 **File sharing**: PNG, JPG, GIF, PDF, JPEG
- 🔗 Join via global or server-specific invite links
- ⚡ Instant socket events: join, leave, message read
- 🔐 **Server-controlled message decryption** after access requirements are met
- 💣 Self-destructing servers and messages
- 🕹️ Immersive UX: sound effects + ambient soundtrack

---

## 🧱 Tech Stack

- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Socket.IO (Client)**
- **Zustand** – lightweight global state management
- **Framer Motion** – page & component animations
- **Custom fingerprint algorithm** – no 3rd-party tracking
- **Audio hook** – to manage interaction sounds

---

## 🔊 UX Sound Effects

Secret Room isn't just visual — it's sonic.

- ⚔️ **Button clicks** make a soft "sword swing" sound
- 🎵 A **creepy, corny ambient soundtrack** plays during interaction
- 🧠 Sound control is powered by a custom `useSoundEffect` hook

This little detail boosts the eerie/secretive vibe of the app and makes every interaction feel a bit more dramatic.

---

## 🧬 Anonymous ID & Username Logic

- Every user gets a consistent anonymous fingerprint using a **custom in-house algorithm**
- The backend generates usernames using a `serverId-userId` pattern to:
  - ✅ Ensure uniqueness per server
  - ✅ Prevent tracking across servers
  - ✅ Keep identifiers short and unguessable

---

## 🌐 Real-Time Messaging (Socket.IO)

Socket.IO powers the real-time core of Secret Room. The frontend emits and listens for the following events:

### 📥 Incoming
- `new-message`
- `user-joined`
- `user-left`
- `server-expired`

### 📤 Outgoing
- `send-message`
- `mark-as-read`
- `disconnect-intent`

---

## 📁 File Upload Support

Send and receive:

- Images: `png`, `jpg`, `jpeg`, `gif`
- Documents: `pdf`

Files are securely handled and scoped to the session.

---

## 🧠 Message Decryption

Messages are **only decrypted** on the client **after the server confirms access conditions**, offering an extra layer of privacy and control.

---

## 🖼️ Screenshots

### Home Page
![Home page snapshot](https://secret-room.sirv.com/snapshots/Screenshot%202025-04-21%20at%2012.30.58.png)

### Empty Server
![Empty server Snapshot](https://secret-room.sirv.com/snapshots/Screenshot%202025-04-21%20at%2012.31.45.png)

### Invited user joining Server
![invitation complete Snapshot](https://secret-room.sirv.com/snapshots/Screenshot%202025-04-21%20at%2012.34.07.png)

### Host with one User in server
![Server](https://secret-room.sirv.com/snapshots/Screenshot%202025-04-21%20at%2012.32.08.png)

### Conversation from Host to invited user
![Host to user](https://secret-room.sirv.com/snapshots/Screenshot%202025-04-21%20at%2012.33.17.png)

### Invited user's view
![Invited User chat view](https://secret-room.sirv.com/snapshots/Screenshot%202025-04-21%20at%2012.33.31.png)

---

## ⚙️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/fabiconcept/secret-room

# 2. Go to the project folder
cd secret-room

# 3. Install dependencies
npm install

# 4. Configure environment variables
# .env.local
NEXT_PUBLIC_SIRV_CLIENT_ID
NEXT_PUBLIC_SIRV_CLIENT_SECRET
NEXT_PUBLIC_SIRV_CDN_URL
NEXT_PUBLIC_SIRV_API_URL
NEXT_PUBLIC_SERVER_URL
NEXT_PUBLIC_SOCKET_SERVER_URL
NEXT_PUBLIC_API_KEY
NEXT_PUBLIC_APP_URL

# 5. Run the development server
npm run dev
```

---

## ✅ Done & Polished

- ✅ Fully mobile responsive
- ✅ Clean server expiration screen UX
- ✅ File sharing support
- ✅ Deterministic anonymous usernames
- ✅ Auto message decryption
- ✅ Audio-enhanced UX (buttons + ambiance)

---

## 🙌 Author

Built with ❤️ by [Favour Tochukwu Ajokubi](https://github.com/fabiconcept)

---

## 🛡 License

This project is licensed under the [MIT License](LICENSE)
