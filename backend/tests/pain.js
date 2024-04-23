// testMongoMemoryServer.js
const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
    try {
        console.log('Attempting to start MongoDB Memory Server...');
        const mongoServer = await MongoMemoryServer.create();
        const uri = await mongoServer.getUri();
        console.log('MongoDB Memory Server started at URI:', uri);
        await mongoServer.stop();
        console.log('MongoDB Memory Server stopped.');
    } catch (error) {
        console.log('Failed to start MongoDB Memory Server:', error);
    }
})();

console.log('rrr')