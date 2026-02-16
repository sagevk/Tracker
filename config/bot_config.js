const { GatewayIntentBits } = require("discord.js");

const bot_token = process.env.BOT_TOKEN;
const target_user_id = "";
const target_guild_id = "";
const log_channel_id = "";

const required_intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
];

module.exports = {
    bot_token,
    target_user_id,
    target_guild_id,
    log_channel_id,
    required_intents,
};
