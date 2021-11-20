"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockTime = void 0;
async function getBlockTime(provider) {
    const currentBlock = await provider.getBlockNumber();
    const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;
    return currentBlockTime;
}
exports.getBlockTime = getBlockTime;
