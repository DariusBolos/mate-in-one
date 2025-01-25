const express = require('express');
const { port, mongoUrl } = require('./config/config.js');
const User = require('./models/userSchema.js');

const app = express();
app.use(express.json());

const initConnection = require('./config/database.js');
initConnection(mongoUrl);

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});

require('./routes/main.js')(app);

const user1 = new User({
    username: 'Darius',
    email: 'admin@gmail.com',
    password: '1234',
    birthdate: '04-01-2004'
});