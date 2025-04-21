# 🎭 Secret Room - Frontend

**Secret Room** is a fully anonymous, real-time chat app that lets users create temporary servers and invite others to join without revealing their identity. This is the **frontend**, built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Socket.IO**, crafted for speed, privacy, and responsiveness.

> 💡 This project focuses on stateless, anonymous sessions, private invites, and smooth real-time messaging.

---

## 🚀 Features

- 🎨 Beautiful, minimal, **fully mobile-responsive** UI
- 🔐 Complete anonymous user flow — no sign-ups, no names
- 💬 Real-time chat with **Socket.IO**
- 🔐 Server-controlled message decryption when access rules are met
- 📁 **File sharing**: PNG, JPG, GIF, PDF, JPEG
- 🔗 Join via global or server-specific invite links
- 🧼 Messages and servers self-destruct after expiration
- ⚡ Instant socket events: join, leave, message read

---

## 🧱 Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Socket.IO (Client)**
- **Zustand** – lightweight global state management
- **Framer Motion** – page & component animations
- **Custom session/fingerprint logic** – no 3rd-party tracking

---

## 🧬 Anonymous ID & Username Logic

- Every user is assigned a consistent anonymous fingerprint using a **custom in-house algorithm**
- The backend generates usernames using a `serverId-userId` pattern to:
  - ✅ Ensure uniqueness per server
  - ✅ Prevent session tracking between servers
  - ✅ Keep usernames deterministic but private

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

You can send and receive:

- Images: `png`, `jpg`, `jpeg`, `gif`
- Documents: `pdf`

Files are handled securely and are tied to the server session.

---

## 🧠 Message Decryption

Messages are **only decrypted** on the frontend **after server-side conditions are met**, ensuring confidentiality and control at every level.

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
git clone https://github.com/your-username/secret-room-frontend

# 2. Go to the project folder
cd secret-room-frontend

# 3. Install dependencies
npm install

# 4. Configure environment variables
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# 5. Run the development server
npm run dev
```

---

## 📦 Folder Structure

```
.
├── app/
│   ├── (routes)
│   └── layout.tsx
├── components/
├── hooks/
├── socket/
├── store/
├── types/
├── public/
│   └── screens/
├── utils/
└── styles/
```

---

## ✅ Done & Polished

- ✅ Fully mobile responsive
- ✅ Clean server expiration screen UX
- ✅ File sharing support
- ✅ Deterministic anonymous usernames
- ✅ Auto message decryption

---

## 🙌 Author

Built with ❤️ by [Favour Tochukwu Ajokubi (FavourBE)](https://github.com/FavourBE)

---

## 🛡 License

This project is licensed under the [MIT License](LICENSE)
