const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    wShift: {type: String, required: true},
    photo: {type: String, required: true},
    role: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

const user = mongoose.model('User', userSchema, 'users');

module.exports = user;