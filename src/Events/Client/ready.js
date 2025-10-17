const { Client } = require("discord.js");

// Importiert die loadHandler Funktionen
const { loadCommands } = require("../../Structures/Handlers/commandHandler");

// Importiert MongoDB
const { connect } = require("mongoose");

// IDs der Channels
const { updateChannelNames } = require("../../Structures/Systems/timerChannel");

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    async execute(client) {
        console.log(`Client logged in as ${client.user.tag}`);

        // Läd alle weiteren Handler (Command, Buttons, etc.)
        await loadCommands(client);

        // Verbindet sich mit der Datenbank
        setInterval(() => updateChannelNames(client), 300000);
    }
}