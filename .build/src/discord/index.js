"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.initDiscord = void 0;
const constants_1 = require("@app/constants");
const discord_js_1 = require("discord.js");
const constants_2 = require("../constants");
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
let isReady = false;
async function initDiscord() {
    client.once('ready', () => {
        isReady = true;
        sendMessage(`
--- Time alert server connected ---
     Check interval: ${constants_2.INTERVAL_RATE / 1000}s
     Minimum discount threshold: ${constants_1.MIN_ALERT_DISCOUNT}%
--- GL ---`);
    });
    client.login(constants_1.DISCORD_BOT_TOKEN);
}
exports.initDiscord = initDiscord;
async function sendMessage(message, channelId = constants_1.DISCORD_CHANNEL_ID) {
    const channel = client.channels.cache.get(channelId);
    if (!isReady) {
        return;
    }
    if (channel?.isText()) {
        try {
            await channel.send(message);
        }
        catch (e) {
            console.log('🔥', 'Message failed to send', e.message);
        }
    }
}
exports.sendMessage = sendMessage;
