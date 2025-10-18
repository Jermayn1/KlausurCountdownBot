const { ActivityType } = require('discord.js');

// Dein Klausurdatum
const examDate = new Date("2026-02-09T00:00:00Z");

/**
 * Setzt den Bot-Status auf die verbleibende Zeit bis zur Klausur
 * in Tagen, Stunden und Minuten.
 * @param {Client} client Discord Client
 */
function updateBotStatus(client) {
    const now = new Date();
    let diffMs = examDate - now;

    if (diffMs <= 0) {
        client.user.setActivity(`Klausur ist vorbei!`, { type: ActivityType.Watching });
        return;
    }

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;

    // Status setzen
    let status = `Noch `;
    if (days > 0) status += `${days}T `;
    status += `${hours}h ${minutes}m bis zur Klausur`;

    client.user.setActivity(status, { type: ActivityType.Watching });
}

module.exports = { updateBotStatus };
