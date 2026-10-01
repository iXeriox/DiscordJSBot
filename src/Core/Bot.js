const { Client, Collection, GatewayIntentBits } = require('discord.js');
const loadCommands = require('./loadCommands');
const loadPlugins = require('./loadPlugins');
const registerCommands = require('./registerCommands');
const utils = require('./utils');

class Bot extends Client {
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    });

    this.commands = new Collection();
    this.utils = utils;
  }

  async start() {
    const token = process.env.DISCORD_TOKEN;
    if (!token) throw new Error('DISCORD_TOKEN is missing. Copy .env.example to .env.');

    await loadCommands(this);
    await loadPlugins(this);

    this.once('ready', async () => {
      console.log(`Logged in as ${this.user.tag}`);

      try {
        await registerCommands(this, token);
      } catch (error) {
        console.error('Could not register application commands:', error);
      }
    });

    this.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = this.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, this);
      } catch (error) {
        console.error(`Command /${interaction.commandName} failed:`, error);
        await utils.safeReply(interaction, {
          content: 'Something went wrong while running that command.',
          ephemeral: true,
        });
      }
    });

    await this.login(token);
  }
}

module.exports = Bot;
