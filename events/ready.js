const { ActivityType } = require("discord.js");
const { format_timestamp } = require("../utils/time_format");

const event_name = "ready";
const run_once = true;

function execute(client) {
    client.user.setPresence({
        status: "online",
        activities: [
            {
                name: "stalking",
                type: ActivityType.Watching,
            },
        ],
    });

    const timestamp = format_timestamp();
    console.log(`[${timestamp}] I Guess Bro ${client.user.tag}`);
}

module.exports = { event_name, run_once, execute };
