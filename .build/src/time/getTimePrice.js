"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeBuyPrice = exports.getTimePrice = void 0;
const ethers_1 = require("ethers");
const JoeRouter02_json_1 = __importDefault(require("@app/abi/JoeRouter02.json"));
const addresses_1 = require("@app/addresses");
const provider_1 = require("@app/blockchain/provider");
const tokens_1 = require("@app/time/tokens");
const types_1 = require("@app/time/types");
async function getTimePrice(priceType = types_1.PriceType.sell) {
    if (priceType === types_1.PriceType.buy) {
        return getTimeBuyPrice();
    }
    const router = new ethers_1.ethers.Contract(addresses_1.JOE_ROUTER, JoeRouter02_json_1.default, (0, provider_1.getProvider)());
    try {
        const out = await router.getAmountsOut(ethers_1.ethers.utils.parseUnits('1', tokens_1.TIME.decimals), [
            tokens_1.TIME.address,
            tokens_1.WAVAX.address,
            tokens_1.USDT.address
        ]);
        console.log('🔥 $time price AVAX: ', ethers_1.ethers.utils.formatUnits(out[1], tokens_1.WAVAX.decimals));
        console.log('🔥 $time price USD: ', ethers_1.ethers.utils.formatUnits(out[2], tokens_1.USDT.decimals));
        return {
            avax: Number(ethers_1.ethers.utils.formatUnits(out[1], tokens_1.WAVAX.decimals)),
            usd: Number(ethers_1.ethers.utils.formatUnits(out[2], tokens_1.USDT.decimals))
        };
    }
    catch (e) {
        console.log('🔥 getTimePriceError', e);
    }
    return null;
}
exports.getTimePrice = getTimePrice;
async function getTimeBuyPrice() {
    const router = new ethers_1.ethers.Contract(addresses_1.JOE_ROUTER, JoeRouter02_json_1.default, (0, provider_1.getProvider)());
    try {
        const out = await router.getAmountsOut(ethers_1.ethers.utils.parseUnits('10000', tokens_1.USDT.decimals), [
            tokens_1.USDT.address,
            tokens_1.WAVAX.address,
            tokens_1.TIME.address
        ]);
        const qtyUsdtStr = ethers_1.ethers.utils.formatUnits(out[2], tokens_1.TIME.decimals);
        const qtyUsdtNum = Number(qtyUsdtStr);
        const qtyAvaxStr = ethers_1.ethers.utils.formatUnits(out[1], tokens_1.WAVAX.decimals);
        const qtyAvaxNum = Number(qtyAvaxStr);
        const usdPrice = 10000 / qtyUsdtNum;
        const avaxPrice = qtyAvaxNum / qtyUsdtNum;
        return { avax: avaxPrice, usd: usdPrice };
    }
    catch (e) {
        console.log('🔥 getTimePriceError', e);
    }
    return null;
}
exports.getTimeBuyPrice = getTimeBuyPrice;
