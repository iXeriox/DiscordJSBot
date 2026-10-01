const fs = require('node:fs/promises');
const path = require('node:path');

module.exports = async function loadCommands(client) {
  const directory = path.join(__dirname, '..', 'Commands');
  const files = (await fs.readdir(directory)).filter((file) => file.endsWith('.js'));

  for (const file of files) {
    const command = require(path.join(directory, file));

    if (!command.data?.name || typeof command.execute !== 'function') {
      console.warn(`Skipped invalid command: ${file}`);
      continue;
    }

    client.commands.set(command.data.name, command);
  }

  console.log(`Loaded ${client.commands.size} command(s).`);
};
