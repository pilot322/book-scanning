const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ['scanner', 'manager', 'admin'], default: 'scanner', required: true },
    department: { type: Number, required: true },
    currentSession: { type: Schema.Types.Mixed }
});

userSchema.index({ username: 1 });

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
