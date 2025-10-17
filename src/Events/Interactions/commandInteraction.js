const { ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const response = new EmbedBuilder()
        .setColor(client.config.color.normal);

        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.reply({
            ephemeral: true,
            embeds: [response.setDescription("🧙  Dieser Befehl ist outdated.")]
        });

        if (command.developer && client.config.developer[interaction.user.id]) return interaction.reply({
            ephemeral: true,
            embeds: [response.setDescription("👨‍🚀  Dieser Befehl ist nur für Developers.")]
        });

        const subCommand = interaction.options.getSubcommand(false);
        if(subCommand) {
            const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);
            if (!subCommandFile) return interaction.reply({
                ephemeral: true,
                embeds: [response.setDescription("🕵️‍♂️  Dieser Unterbefehl ist outdated.")]
            });

            // Discord doesnt allow you to set for each subCommand the permissions
            if (subCommandFile.permission && !interaction.member.permissions.has(subCommandFile.permission)) return interaction.reply({
                ephemeral: true,
                embeds: [response.setDescription("😵‍💫  Du hast keine Berechtigungen, um diesen Unterbefehl zu verwenden.")]
            });
            subCommandFile.execute(interaction, client);
        } else command.execute(interaction, client);
    }
}