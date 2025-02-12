const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
    _id: String,
    type: String,
    name: String,
    url: String
})

const userSchema = new mongoose.Schema({
    _id: String,
    username: String,
    email: String,
    password: String,
    createdDate: Date,
    avatar: avatarSchema
})

const User = mongoose.model('User', userSchema);

module.exports = User;