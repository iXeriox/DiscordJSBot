const { REST, Routes } = require('discord.js');

module.exports = async function registerCommands(client, token) {
  const clientId = process.env.CLIENT_ID;
  if (!clientId) {
    console.warn('CLIENT_ID is missing; application commands were not registered.');
    return;
  }

  const body = client.commands.map((command) => command.data.toJSON());
  const rest = new REST({ version: '10' }).setToken(token);
  const route = process.env.GUILD_ID
    ? Routes.applicationGuildCommands(clientId, process.env.GUILD_ID)
    : Routes.applicationCommands(clientId);

  await rest.put(route, { body });
  console.log(`Registered ${body.length} ${process.env.GUILD_ID ? 'guild' : 'global'} command(s).`);
};
