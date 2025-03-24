const { Server } = require("socket.io");

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        socket.on("send_game_state", (data) => {
            socket.broadcast.emit("receive_game_state", data);
        });
    });
}

module.exports = initSocket;