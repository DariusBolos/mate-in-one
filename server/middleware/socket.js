const { Server } = require("socket.io");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("send_game_state", (data) => {
      socket.broadcast.emit("receive_game_state", data);
    });

    socket.on("send_result", (data) => {
      io.sockets.emit("receive_result", data);
    });
  });
};

module.exports = initSocket;
