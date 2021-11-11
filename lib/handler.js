"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
require("./aliases");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const checkAndAlert_1 = __importDefault(require("@app/time/checkAndAlert"));
const provider_1 = require("@app/blockchain/provider");
const discord_1 = require("@app/discord");
async function run() {
    await (0, provider_1.connectProvider)();
    try {
        (0, discord_1.initDiscord)();
    }
    catch (e) {
        console.log('🔥 dic init e', e);
    }
    try {
        (0, checkAndAlert_1.default)();
    }
    catch (e) {
        console.log('🔥 check e', e);
    }
}
exports.run = run;
