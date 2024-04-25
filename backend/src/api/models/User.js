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
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password') && !this.isNew) {
        return next();

    }
    this.passwordHash = await bcrypt.hash(this.passwordHash, 8);
    next();
});


userSchema.post('save', function (doc, next) {
    let actionType = '';
    let description = '';

    if (doc.isNew) {
        // This is a new user creation
        actionType = 'CREATE';
        description = 'New user created';
    } else {
        // This is an update to an existing user
        actionType = 'UPDATE';
        description = 'User details updated';
    }

    // Create an action log entry
    ActionLog.createAction({
        user: doc._id,
        actionType: actionType,
        description: description,
        onModel: 'User',
        target: doc._id,
        metadata: {
            username: doc.username,
            email: doc.email
        }
    }).then(() => {
        console.log(`Action log created for user ${actionType.toLowerCase()}`);
        next();
    }).catch(err => {
        console.error('Error creating action log:', err);
        next(err);
    });
});


// Static method to find user by username
userSchema.statics.findByUsername = function (username) {
    return this.findOne({ username });
};

// Instance method to check password
userSchema.methods.checkPassword = function (password) {
    console.log('comparing password ' + password + ` (${bcrypt.hashSync(password, 8)}) and ` + this.passwordHash)
    return bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
