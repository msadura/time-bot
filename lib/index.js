"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./aliases");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const provider_1 = require("@app/blockchain/provider");
const wallet_1 = require("@app/blockchain/wallet");
const discord_1 = require("@app/discord");
const constants_1 = require("@app/constants");
const checkAndAlert_1 = __importDefault(require("@app/time/checkAndAlert"));
const autoRedeem_1 = require("@app/redeem/autoRedeem");
async function main() {
    await (0, provider_1.connectProvider)();
    await (0, wallet_1.connectWallet)();
    // Uncomment to log / trigger discounts above MIN_ALERT_DISCOUNT treshold
    setInterval(checkAndAlert_1.default, constants_1.INTERVAL_RATE);
    (0, discord_1.initDiscord)();
    (0, autoRedeem_1.autoRedeem)();
}
main();
