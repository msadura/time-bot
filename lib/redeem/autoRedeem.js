"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoRedeem = void 0;
const redeemCountdown_1 = require("@app/redeem/utils/redeemCountdown");
const provider_1 = require("@app/blockchain/provider");
async function autoRedeem() {
    const redeemCb = () => {
        console.log('🔥', 'trigger redeem!');
    };
    (0, redeemCountdown_1.redeemCountdown)((0, provider_1.getProvider)(), redeemCb);
}
exports.autoRedeem = autoRedeem;
