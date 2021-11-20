"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecondsToNextRebase = void 0;
const secondsUntilBlock_1 = require("@app/redeem/utils/secondsUntilBlock");
const getNextRebase_1 = require("@app/redeem/utils/getNextRebase");
const getBlockTime_1 = require("@app/redeem/utils/getBlockTime");
async function getSecondsToNextRebase(provider) {
    const currentTime = await (0, getBlockTime_1.getBlockTime)(provider);
    const rebaseTime = await (0, getNextRebase_1.getNextRebase)(provider);
    return (0, secondsUntilBlock_1.secondsUntilBlock)(currentTime, rebaseTime);
}
exports.getSecondsToNextRebase = getSecondsToNextRebase;
