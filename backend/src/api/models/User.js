const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')
const ActionLog = require('./ActionLog')
const Session = require('./Session')
const Book = require('./Book')

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    roles: [{ type: String, enum: ['scanner', 'manager', 'admin'] }],
    department: { type: Number, required: true },
    currentSession: { type: Schema.Types.Mixed },
    refreshToken: { type: String }
});

userSchema.index({ username: 1 });

// Password hashing middleware
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password') && !this.isNew) {
        return next();
    }

    const actionType = this.isNew ? 'CREATE_USER' : 'UPDATE_USER';
    const description = this.isNew ? 'New user created' : 'User details updated';

    this.passwordHash = await bcrypt.hash(this.passwordHash, 8);
    next();
});

// Static method to find user by username
userSchema.statics.findByUsername = function (username) {
    return this.findOne({ username });
};

// Instance method to start session
userSchema.methods.startSession = async function (barcode, sessionType, scannerId) {
    console.log('stating new session..', barcode, sessionType)

    const book = await Book.findOne({ barcode });
    if (!book) {
        throw new Error('Book not found');
    }
    const newSession = await new Session({
        book: book._id,
        user: this._id,
        sessionType: sessionType,
        scannerId: scannerId
    }).save();

    book.sessions.push(newSession._id);
    await book.save();

    this.currentSession = newSession._id;  // Update currentSession
    await this.save();  // Save the user document
    return newSession;
}

userSchema.methods.clearSession = async function () {
    this.currentSession = null;  // Clear the current session
    await this.save();  // Save the user document
}

// instance method to end session
userSchema.methods.endSession = async function (stopPage) {
    if (!this.currentSession) {
        throw new Error('No active session to end');
    }

    const session = await Session.findById(this.currentSession);
    if (!session) {
        throw new Error('Session not found');
    }

    session.status = 'finished';
    session.stopPage = stopPage;
    session.endTime = new Date();
    await session.save();

    this.currentSession = null;  // Clear the current session
    await this.save();  // Save the user document

    return session;
}

// Instance method to check password
userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
