const { ActivityType } = require('discord.js');

module.exports = {
  name: 'activity',

  setup(client) {
    client.once('ready', () => {
      client.user.setActivity('/help', { type: ActivityType.Listening });
    });
  },
};
