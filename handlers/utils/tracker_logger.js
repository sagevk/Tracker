const { format_timestamp } = require("./time_format");
const { log_channel_id } = require("../config/bot_config");

async function log_status_change(client, user_tag, old_status, new_status) {
    const timestamp = format_timestamp();
    const message = `[${timestamp}] **${user_tag}** went from \`${old_status}\` → \`${new_status}\``;

    console.log(`[${timestamp}] ${user_tag}: ${old_status} → ${new_status}`);

    try {
        const channel = await client.channels.fetch(log_channel_id);

        if (channel && channel.isTextBased()) {
            await channel.send(message);
        }
    } catch (error) {
        console.error(`Something Broke: ${error.message}`);
    }
}

module.exports = { log_status_change };
