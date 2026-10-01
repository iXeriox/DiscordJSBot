# Modular Discord.js Bot

A deliberately small Discord.js v14 starter with separate **Core**, **Commands**, and **Plugins** folders.

## Setup

1. Install [Node.js 18 or newer](https://nodejs.org/) and run `npm install`.
2. Copy `.env.example` to `.env` and add the token and application ID from the Discord Developer Portal.
3. Add `GUILD_ID` while developing for instant command updates. Remove it to register commands globally (global updates can take time).
4. Invite the application with the `bot` and `applications.commands` scopes, then run `npm start`.

Only the **Server Members Intent** is requested in addition to the basic guild intent. Enable it in the Developer Portal if you use `findMember`; otherwise remove `GatewayIntentBits.GuildMembers` from `Core/Bot.js`.

## Structure

```text
src/
├── Core/       # Client, loaders, command registration, shared helpers
├── Commands/   # Slash commands
├── Plugins/    # Optional features that subscribe to client events
└── index.js    # Entry point
```

## Add a command

Create a file in `src/Commands`:

```js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Say hello.'),

  async execute(interaction, client) {
    await interaction.reply({ embeds: [client.utils.success('Hello!')] });
  },
};
```

The loader finds it automatically and the bot registers it at startup.

## Add a plugin

Plugins keep event-driven features out of the core. Create a file in `src/Plugins` exporting a `setup` function:

```js
module.exports = {
  name: 'welcome',
  setup(client) {
    client.on('guildMemberAdd', (member) => {
      console.log(`${member.user.tag} joined ${member.guild.name}`);
    });
  },
};
```

## Shared helper functions

Every command and plugin receives the bot client. Shared helpers are available on `client.utils`:

- `createEmbed(title, description, color)`
- `success(description)` and `error(description)`
- `formatDuration(milliseconds)`
- `findMember(guild, search)` (ID, exact username, or partial display name)
- `safeReply(interaction, options)` (replies or follows up as appropriate)

Add more project-wide helpers to `src/Core/utils.js` and export them; there is no need to modify the global JavaScript namespace.
