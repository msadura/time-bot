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
const getDiscounts_1 = __importDefault(require("@app/time/getDiscounts"));
const discord_1 = require("@app/discord");
const constants_1 = require("@app/constants");
const checkAndAlert_1 = __importDefault(require("@app/time/checkAndAlert"));
async function main() {
    await (0, provider_1.connectProvider)();
    await (0, wallet_1.connectWallet)();
    const logDiscounts = async () => {
        const discounts = await (0, getDiscounts_1.default)();
        console.log('🔥', discounts);
    };
    // Uncomment to log all discounts
    // setInterval(logDiscounts, INTERVAL_RATE);
    // logDiscounts();
    // Uncomment to log / trigger discounts above MIN_ALERT_DISCOUNT treshold
    setInterval(checkAndAlert_1.default, constants_1.INTERVAL_RATE);
    // alertDiscounts();
    // const app = express();
    // app.listen(PORT, () => {
    //   console.log(`[ server ] ready on port ${PORT}`);
    // });
    (0, discord_1.initDiscord)();
}
main();
