const express = require('express');
const { port, mongoUrl } = require('./config/config.js');
const initDatabaseConnection = require('./config/database.js');
const cors = require('cors');
const http = require("http");
const initSocket = require("./middleware/socket.js");
const userRoutes = require('./routes/userRoutes.js');

const app = express();

initDatabaseConnection(mongoUrl).then();
app.use(express.json());
app.use(cors());
app.use('/user', userRoutes);

const server = http.createServer(app);
initSocket(server);

server.listen(port, () => {
    console.log("Server is running");
});
