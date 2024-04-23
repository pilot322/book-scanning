// jest.config.js
module.exports = {
    testEnvironment: 'node',
    globalSetup: './tests/globalSetup.js',  // Points to your global setup file
    globalTeardown: './tests/globalTeardown.js',  // Points to your global teardown file
    testTimeout: 5000,  // Extends timeout to handle longer operations
    setupFilesAfterEnv: [
        './tests/setup.js'
    ]
};
