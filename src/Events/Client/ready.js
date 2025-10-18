const { Client } = require("discord.js");

// Importiert die loadHandler Funktionen
const { loadCommands } = require("../../Structures/Handlers/commandHandler");

// Importiert MongoDB
const { connect } = require("mongoose");

const { updateChannelNames } = require("../../Structures/Systems/timerChannel");
const { updateBotStatus } = require("../../Structures/Systems/updatetStatus");

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

        // Updatet alle 5 Minuten die Channel Names
        setInterval(() => updateChannelNames(client), 300000);
        // Updatet alle 1 Minute den Bot Status
        setInterval(() => updateBotStatus(client), 60 * 1000);
    }
}