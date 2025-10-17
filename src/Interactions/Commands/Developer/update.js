const { SlashCommandBuilder ,ChatInputCommandInteraction, Client, EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageFlags } = require("discord.js");

module.exports = {
    developer: true,
    data:  new SlashCommandBuilder()
    .setName("update")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Startet den Bot neu und läd dabei das neuste Update von Github runter!"),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        // Sendet die Nachricht
        await interaction.reply({
            content: "🔄️ Bot wird neu gestartet...",
            flags: [MessageFlags.Ephemeral]
        }).then(() => {
            // Stopt den Bot (dieser startet automatisch nach 10 Sekunden neu)
            process.exit(0);
        });
    }
}