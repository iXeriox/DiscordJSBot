require('dotenv').config();

const Bot = require('./Core/Bot');

const bot = new Bot();

bot.start().catch((error) => {
  console.error('The bot failed to start:', error);
  process.exitCode = 1;
});
