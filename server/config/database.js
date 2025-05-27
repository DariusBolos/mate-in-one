async function initDatabaseConnection(connectionUrl) {
    const mongoose = require('mongoose');

    await mongoose.connect(connectionUrl)
    .then(() => {
        console.log("Database is connected successfully!");
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = initDatabaseConnection;