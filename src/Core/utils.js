function createEmbed(title, description, color = 0x5865f2) {
  const { EmbedBuilder } = require('discord.js');
  return new EmbedBuilder().setColor(color).setTitle(title).setDescription(description).setTimestamp();
}

function success(description) {
  return createEmbed('Success', description, 0x57f287);
}

function error(description) {
  return createEmbed('Error', description, 0xed4245);
}

function formatDuration(milliseconds) {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) return '0s';

  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    days && `${days}d`,
    hours && `${hours}h`,
    minutes && `${minutes}m`,
    (seconds || (!days && !hours && !minutes)) && `${seconds}s`,
  ].filter(Boolean).join(' ');
}

function findMember(guild, search) {
  if (!guild || !search) return undefined;
  const value = search.toLowerCase();

  return guild.members.cache.find((member) =>
    member.id === search
      || member.user.username.toLowerCase() === value
      || member.displayName.toLowerCase().includes(value));
}

async function safeReply(interaction, options) {
  if (interaction.replied || interaction.deferred) return interaction.followUp(options);
  return interaction.reply(options);
}

module.exports = { createEmbed, error, findMember, formatDuration, safeReply, success };
