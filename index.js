require("dotenv").config();

const { Client } = require("discord.js");
const { bot_token, required_intents } = require("/config/bot_config");
const { register_events } = require("/handlers/event_handler");

const client = new Client({ intents: required_intents });

register_events(client);

client.login(bot_token);
