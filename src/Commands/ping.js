const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Check whether the bot is online.'),

  async execute(interaction, client) {
    await interaction.reply({
      embeds: [client.utils.success(`Pong! WebSocket latency: ${client.ws.ping}ms`)],
    });
  },
};
