const { Events } = require("discord.js");
const connectToDatabase = require('../../Database/connection');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Logged in as: ${client.user.tag}`)

        // MongoDB
        await connectToDatabase();
    }
}