const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['employee', 'manager', 'admin'], default: 'employee' },
    lastLogin: Date
});

const User = mongoose.model('User', userSchema);
module.exports = User;
