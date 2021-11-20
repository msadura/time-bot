"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemCountdown = void 0;
const constants_1 = require("@app/constants");
const getNextRebase_1 = require("@app/redeem/utils/getNextRebase");
const LONG_CHECK = constants_1.REDEEM_TRIGGER; // 10min;
const SHORT_CHECK = 1 * 60 * 1000; // 1min;
async function redeemCountdown(provider, triggerReedemCb) {
    let currentTriggered = false;
    let rebaseTime = await (0, getNextRebase_1.getNextRebase)(provider);
    const redeemCheck = async () => {
        const timeLeft = secondsLeftToRebase(rebaseTime * 1000);
        let timeout = LONG_CHECK;
        if (timeLeft < constants_1.REDEEM_TRIGGER && !currentTriggered) {
            triggerReedemCb();
            currentTriggered = true;
        }
        if (timeLeft < LONG_CHECK * 2 && !currentTriggered) {
            console.log('🔥', 'Short check');
            timeout = SHORT_CHECK;
        }
        if (timeLeft < 0) {
            console.log('🔥', 'Getting new rebase time');
            rebaseTime = await (0, getNextRebase_1.getNextRebase)(provider);
            currentTriggered = false;
        }
        setTimeout(redeemCheck, timeout);
    };
    redeemCheck();
}
exports.redeemCountdown = redeemCountdown;
function secondsLeftToRebase(rebase, current = Date.now()) {
    return rebase - current;
}
