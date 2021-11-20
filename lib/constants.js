"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDEEM_TRIGGER = exports.MIN_ALERT_DISCOUNT = exports.INTERVAL_RATE = exports.DISCORD_CHANNEL_ID = exports.DISCORD_BOT_TOKEN = exports.MNEMONIC = exports.RPC_URL = void 0;
exports.RPC_URL = process.env.RPC_URL;
exports.MNEMONIC = process.env.MNEMONIC;
exports.DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
exports.DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
exports.INTERVAL_RATE = 30000; //ms
exports.MIN_ALERT_DISCOUNT = 9; //%
exports.REDEEM_TRIGGER = 10 * 60 * 1000; //10 min
