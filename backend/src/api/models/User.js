const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['employee', 'manager', 'admin'], default: 'employee' },
    lastLogin: Date
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (this.isModified('passwordHash')) {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 8);
    }
    next();
});

// Static method to find user by username
userSchema.statics.findByUsername = function (username) {
    return this.findOne({ username });
};

// Instance method to check password
userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
