const express = require('express');
const { port, mongoUrl } = require('./config/config.js');
const initDatabaseConnection = require('./config/database.js');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');

initDatabaseConnection(mongoUrl);
app.use(express.json());
app.use(cors())

app.use('/user', userRoutes);

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});