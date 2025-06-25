const express = require("express");
const { mongoUrl } = require("./config/config.js");
const initDatabaseConnection = require("./config/database.js");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
const initSocket = require("./middleware/socket.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const PORT = process.env.PORT || 3000;
const app = express();

initDatabaseConnection(mongoUrl).then();
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
