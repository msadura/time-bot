"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectAndGetWallet = exports.getWallet = exports.connectWallet = void 0;
const provider_1 = require("@app/blockchain/provider");
const constants_1 = require("@app/constants");
const ethers_1 = require("ethers");
let httpWallet;
async function connectWallet() {
    if (!constants_1.MNEMONIC) {
        console.log('🔥', 'Mnemonic not detected. App will not be able to sign txs.');
        return;
    }
    const wallet = ethers_1.ethers.Wallet.fromMnemonic(constants_1.MNEMONIC);
    console.info('🔥', 'Connecting wallet...');
    try {
        const httpProvider = (0, provider_1.getProvider)();
        httpWallet = httpProvider && wallet.connect(httpProvider);
    }
    catch (e) {
        console.log('🔥 Wallet connect error', e);
    }
    console.log('🔥', `Wallet connected: ${httpWallet.address}`);
}
exports.connectWallet = connectWallet;
function getWallet() {
    if (httpWallet) {
        return httpWallet;
    }
    throw 'Incorrect wallet connection type or accoount not connected';
}
exports.getWallet = getWallet;
function connectAndGetWallet(mnemonic) {
    const wallet = ethers_1.ethers.Wallet.fromMnemonic(mnemonic);
    const provider = (0, provider_1.getProvider)();
    return provider && wallet.connect(provider);
}
exports.connectAndGetWallet = connectAndGetWallet;
