const fs = require("fs");
const path = require("path");

function register_events(client) {
    const events_dir = path.join(__dirname, "..", "events");
    const event_files = fs
        .readdirSync(events_dir)
        .filter((file) => file.endsWith(".js"));

    for (const file of event_files) {
        const event = require(path.join(events_dir, file));

        if (event.run_once) {
            client.once(event.event_name, (...args) => event.execute(...args));
        } else {
            client.on(event.event_name, (...args) => event.execute(...args));
        }

        console.log(`Regged Event: ${event.event_name} (${file})`);
    }
}

module.exports = { register_events };
