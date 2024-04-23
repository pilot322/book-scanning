const config = require('../src/config/dbconfig');
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

module.exports = async function globalTeardown() {
    if (config.Memory) {
        const answer = await rl.question('What is your favorite food? ');
        console.log('ok')
        const instance = global.__MONGOINSTANCE;
        if (instance)
            await instance.stop();
        else
            console.log('no instance')

    } else {
        console.log("there wasnt an instance, LOL.")
    }
};