# ♟️ Mate-in-One  (WORK IN PROGRESS)

**Mate-in-One** is a **full-stack multiplayer chess game** built with **React (TSX), Node.js (Express), and MongoDB (Mongoose)**. It allows players to create an account and enjoy chess either **locally on the same computer or remotely on separate devices**.  

The game offers a seamless experience with real-time gameplay, an intuitive UI, and game history tracking, making it perfect for both casual and competitive chess players.  

---  

## 🌟 Features  

### 🔐 **User Accounts & Authentication**  
- Players can **register, log in, and manage their profiles**.  
- Authentication is handled using **JWT (JSON Web Tokens)** for secure session management.  

### 🎮 **Game Modes**  
- **Local Play:** Two players can take turns on the same device.  
- **Online Multiplayer:** Play against an opponent on a separate computer, with real-time move synchronization.  

### ⏱️ **Real-Time Gameplay**  
- Uses **WebSockets (Socket.IO)** to synchronize moves instantly between players.  
- Ensures a smooth and responsive experience, preventing move conflicts.  

### 📊 **Game History & Replay**  
- Each completed game is stored in the database.  
- Players can review past matches and replay moves.  

### 📝 **Chess Rules & Validation**  
- Implements **all standard chess rules**, including:  
  - Legal move validation (king safety, castling, en passant, etc.).  
  - Check, checkmate, and stalemate detection.  
  - Pawn promotion and draw conditions (threefold repetition, 50-move rule).  

### 🎨 **Modern & Responsive UI**  
- **Beautiful, mobile-friendly chessboard** with piece animations.  
- Built using **React (TSX) and TailwindCSS** for a sleek and responsive design.  

### 💽 **Server-Side Features**  
- **Express.js backend** handles game sessions, user accounts, and move validation.  
- **MongoDB (Mongoose) database** stores user profiles, match history, and settings.  
- **RESTful API** for fetching game data and handling user authentication.  

---  

## 🛠️ Tech Stack  

### **Frontend**  
- **React (TSX)** – Component-based UI for a dynamic chessboard.  
- **TailwindCSS** – Modern styling with responsive design.  
- **React Chessboard** – Interactive chessboard implementation.  
- **Socket.IO Client** – Real-time move synchronization.  

### **Backend**  
- **Node.js (Express)** – REST API and WebSocket server.  
- **MongoDB (Mongoose)** – Database for storing users and game history.  
- **Socket.IO** – Real-time gameplay synchronization.  
- **JWT Authentication** – Secure user sessions.  

---  

## 📺 Installation & Setup  

### **1️⃣ Clone the Repository**  
```bash  
git clone https://github.com/DariusBolos/mate-in-one.git  
cd mate-in-one  
```

### **2️⃣ Install Dependencies**  
```bash  
npm install  
```

### **3️⃣ Set Up Environment Variables**  
Create a `.env` file in the root of the project and add:  
```env  
MONGO_URI=mongodb://localhost:27017/mate-in-one  
JWT_SECRET=your_secret_key  
PORT=5000  
```

### **4️⃣ Start the Backend Server**  
```bash  
cd backend  
nodemon app.js  
```

### **5️⃣ Start the Frontend**  
```bash  
cd frontend  
npm run dev  
```

### **6️⃣ Play the Game!**  
- Open `http://localhost:5173` in your browser.  
- Log in or create an account.  
- Start a game locally or invite a friend to play online!  

---  

## 📝 Future Enhancements  
- ♟️ **AI Opponent** – Play against a computer with different difficulty levels.  
- 🎧 **Voice Chat** – In-game voice chat for online players.  
- 📱 **Mobile App** – React Native version for Android and iOS.  
- 🎨 **Themes & Customization** – Change chess piece styles and board themes.  

---  

## 📜 License  
This project is licensed under the **MIT License**.  

---  

**Mate-in-One** is designed to provide an immersive and interactive chess experience, whether playing with friends locally or competing online. Enjoy the game and checkmate your opponents! ♟️🔥  

