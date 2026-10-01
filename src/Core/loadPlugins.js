const fs = require('node:fs/promises');
const path = require('node:path');

module.exports = async function loadPlugins(client) {
  const directory = path.join(__dirname, '..', 'Plugins');
  const files = (await fs.readdir(directory)).filter((file) => file.endsWith('.js'));
  let loaded = 0;

  for (const file of files) {
    const plugin = require(path.join(directory, file));

    if (typeof plugin.setup !== 'function') {
      console.warn(`Skipped invalid plugin: ${file}`);
      continue;
    }

    await plugin.setup(client);
    loaded += 1;
  }

  console.log(`Loaded ${loaded} plugin(s).`);
};
