const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('help').setDescription('Show all available commands.'),

  async execute(interaction, client) {
    const commands = client.commands
      .map((command) => `**/${command.data.name}** — ${command.data.description}`)
      .sort()
      .join('\n');

    await interaction.reply({
      embeds: [client.utils.createEmbed('Commands', commands || 'No commands are loaded.')],
      ephemeral: true,
    });
  },
};
