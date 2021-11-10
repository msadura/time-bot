"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvider = exports.connectProvider = void 0;
const constants_1 = require("@app/constants");
const ethers_1 = require("ethers");
let provider;
async function connectProvider() {
    provider = new ethers_1.ethers.providers.StaticJsonRpcProvider(constants_1.RPC_URL);
    console.log('🔥 Http provider info:', constants_1.RPC_URL);
    await provider.ready;
    console.log('🔥 Http provider connected');
    return provider;
}
exports.connectProvider = connectProvider;
function getProvider() {
    return provider;
}
exports.getProvider = getProvider;
