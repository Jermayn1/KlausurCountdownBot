// IDs der Channels
const channelsGdi = ["1428797827693281472", "1428797554791022804"];
const channelsSoop = ["1428797577595195432", "1428797805052297409"];

// Klausur-Daten
const examDates = {
    GDI: new Date("2026-02-06T00:08:00Z"),  // GDI am 09.02.2026
    SOOP: new Date("2026-01-30T00:00:00Z"), // SOOP am 30.01.2026
};

// Channel-Namen Prefix
const nameFormat = {
    GDI: "🔢︱GDI in ",
    SOOP: "💻︱SOOP in ",
};

// Hauptfunktion
async function updateChannelNames(client) {
    try {
        const gdiDays = getDaysLeft(examDates.GDI);
        const soopDays = getDaysLeft(examDates.SOOP);

        for (const id of channelsGdi) {
            const channel = await client.channels.fetch(id);
            if (channel) {
                await channel.setName(`${nameFormat.GDI}${gdiDays} Tage`);
            }
        }

        for (const id of channelsSoop) {
            const channel = await client.channels.fetch(id);
            if (channel) {
                await channel.setName(`${nameFormat.SOOP}${soopDays} Tage`);
            }
        }

        console.log(`[INFO] Channels aktualisiert: GDI=${gdiDays} | SOOP=${soopDays}`);
    } catch (err) {
        console.error("Fehler beim Aktualisieren der Channel:", err);
    }
}

// Hilfsfunktion: Berechnet verbleibende Tage
function getDaysLeft(targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
}

module.exports = { updateChannelNames };