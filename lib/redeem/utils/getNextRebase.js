"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextRebase = void 0;
const abi_1 = require("@app/abi");
const addresses_1 = require("@app/addresses");
const ethers_1 = require("ethers");
async function getNextRebase(provider) {
    const stakingContract = new ethers_1.ethers.Contract(addresses_1.STAKING_ADDRESS, abi_1.StakingContract, provider);
    const epoch = await stakingContract.epoch();
    const nextRebase = epoch.endTime;
    return nextRebase;
}
exports.getNextRebase = getNextRebase;
