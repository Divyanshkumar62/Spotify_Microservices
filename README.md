# 🎵 Spotify Microservices Clone

A full-stack, scalable **Spotify-inspired music streaming platform** built using **microservices architecture**. This project replicates core Spotify features like user authentication, music streaming, playlists, and artist management — all powered by independently deployable services.

---

## ⚙️ Tech Stack

### 🧠 Architecture
- Microservices using **Node.js + Express**
- **API Gateway** for routing and service orchestration
- **Service-to-Service Communication** using REST or gRPC
- **Docker** for containerization
- **MongoDB / PostgreSQL** for persistence
- **Redis / RabbitMQ** (optional) for caching or async queues

### 💻 Frontend
- React + Redux
- Tailwind CSS for styling
- Framer Motion for smooth UI animations

---

## 🧩 Microservices Overview

| Service         | Description |
|----------------|-------------|
| **Auth Service** | Handles user registration, login, JWT authentication |
| **User Service** | Manages user profile, preferences |
| **Music Service** | Stores metadata for songs, albums, genres |
| **Playlist Service** | Create, update, and delete playlists |
| **Streaming Service** | Handles audio file hosting and playback |
| **Search Service** | Keyword-based music or artist search (Elasticsearch or DB queries) |
| **Gateway API** | Central entry point for routing requests to services |

---

## ✨ Features

- ✅ **User Auth & JWT Sessions**
- 🎧 **Music Streaming** (static files or cloud storage)
- 📚 **Album & Track Browsing**
- 🎵 **Playlists Management**
- 🔍 **Search Songs, Artists**
- 📦 **Microservices Architecture**
- 🧪 **Unit + Integration Tests** for individual services
- 🐳 **Dockerized Setup** for easy orchestration

---

## 📈 Future Improvements
- Live audio streaming (HLS / DASH)

- Real-time collaboration playlists (via WebSocket)

- Social sharing

- ML-based song recommendations

---

## 🤝 Contributing
Contributions are welcome! Please fork the repo, make changes, and submit a pull request. Open an issue first for major changes.

---

## 🙋‍♂️ Author
Divyansh Kumar
📧 Email Me: kumardivyansh62@gmail.com


