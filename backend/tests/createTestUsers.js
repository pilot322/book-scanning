const User = require('../src/api/models/User');

// Asynchronous function to handle user creation with an optional delete
const createUsers = async (del) => {
    if (del)
        await User.deleteMany({});

    await new User({
        username: 'admin',
        passwordHash: 'password',  // Assuming these are pre-hashed or will be hashed in a middleware
        email: 'test@example.com',
        firstName: 'Giorgos',
        lastName: 'User',
        role: 'admin',
        department: 1
    }).save();

    await new User({
        username: 'manager',
        passwordHash: 'password',  // Assuming these are pre-hashed or will be hashed in a middleware
        email: 'test@example.com',
        firstName: 'Makhs',
        lastName: 'User',
        role: 'manager',
        department: 1
    }).save();

    await new User({
        username: 'scanner',
        passwordHash: 'password',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'scanner',
        department: 1
    }).save();

    await new User({
        username: 'giorgos',
        passwordHash: 'giorgos123',  // Assuming these are pre-hashed or will be hashed in a middleware
        email: 'test@example.com',
        firstName: 'Giorgos',
        lastName: 'User',
        role: 'scanner',
        department: 1
    }).save();

    await new User({
        username: 'makhs',
        passwordHash: 'makhs123',  // Assuming these are pre-hashed or will be hashed in a middleware
        email: 'test@example.com',
        firstName: 'Makhs',
        lastName: 'User',
        role: 'scanner',
        department: 1
    }).save();

    await new User({
        username: 'validUser',
        passwordHash: 'validPass',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'scanner',
        department: 1
    }).save();
};

module.exports = {
    withDelete: async () => {
        await createUsers(true)
    },
    noDelete: async () => {
        await createUsers(false)
    }
}