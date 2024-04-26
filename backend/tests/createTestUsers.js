const User = require('../src/api/models/User');

// Asynchronous function to handle user creation with an optional delete
const createUsers = async () => {
    console.log('this is called yea?')

    await User.deleteMany({});

    const user1 = await User.create({
        username: 'giorgos',
        passwordHash: 'giorgos123',  // Assuming these are pre-hashed or will be hashed in a middleware
        email: 'test@example.com',
        firstName: 'Giorgos',
        lastName: 'User',
        role: 'scanner',
        department: 1
    });

    const user2 = await User.create({
        username: 'makhs',
        passwordHash: 'makhs123',  // Assuming these are pre-hashed or will be hashed in a middleware
        email: 'test@example.com',
        firstName: 'Makhs',
        lastName: 'User',
        role: 'scanner',
        department: 1
    });

    await user1.save();
    await user2.save();
};

module.exports = createUsers