"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@app/constants");
const discord_1 = require("@app/discord");
const getDiscounts_1 = __importDefault(require("@app/time/getDiscounts"));
let prevDiscountsToAlert = [];
async function checkAndAlert() {
    const discounts = await (0, getDiscounts_1.default)();
    const discountsToAlert = [];
    console.log('🔥', discounts);
    discounts.forEach(d => {
        if (d.discount && d.discount > constants_1.MIN_ALERT_DISCOUNT) {
            discountsToAlert.push(d);
        }
    });
    if (discountsToAlert.length > 0 && haveDiscountsChanged(discountsToAlert)) {
        (0, discord_1.sendMessage)('--- 🔥 Time discounts alert 🔥 ---' +
            discountsToAlert.map(d => `\n     ${d.bond} - ${d.discount?.toFixed(2)}%`) +
            '\n------ @here');
    }
    prevDiscountsToAlert = discountsToAlert || [];
}
exports.default = checkAndAlert;
function haveDiscountsChanged(discounts) {
    return JSON.stringify(discounts) !== JSON.stringify(prevDiscountsToAlert);
}
