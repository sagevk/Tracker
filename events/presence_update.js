const { target_user_id, target_guild_id } = require("../config/bot_config");
const { log_status_change } = require("../utils/tracker_logger");

const event_name = "presenceUpdate";
const run_once = false;

const DEBOUNCE_MS = 10_000;
let pending_timer = null;
let baseline_status = null;

function execute(old_presence, new_presence) {
    if (!new_presence || !new_presence.member) return;

    const user_id = new_presence.userId;
    const guild_id = new_presence.guild?.id;

    if (user_id !== target_user_id) return;
    if (guild_id !== target_guild_id) return;

    const old_status = old_presence?.status || "offline";
    const new_status = new_presence.status || "offline";

    if (old_status === new_status) return;

    if (pending_timer) {
        clearTimeout(pending_timer);
        pending_timer = null;

        if (new_status === baseline_status) { 
            baseline_status = null;
            return;
        }
    }

    if (!baseline_status) {
        baseline_status = old_status;
    }

    const user_tag = new_presence.member.user?.tag || "";
    const client = new_presence.client;
    const logged_old = baseline_status;

    pending_timer = setTimeout(() => {
        pending_timer = null;
        baseline_status = null;
        const current_member = client.guilds.cache.get(target_guild_id)?.members.cache.get(target_user_id);
        const current_status = current_member?.presence?.status || "offline";
        if (current_status === new_status) {
            log_status_change(client, user_tag, logged_old, new_status);
        }
    }, DEBOUNCE_MS);
}

module.exports = { event_name, run_once, execute };
