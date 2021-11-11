"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBondPrice = void 0;
const ethers_1 = require("ethers");
const TimeBondDepository_json_1 = __importDefault(require("@app/abi/TimeBondDepository.json"));
const addresses_1 = require("@app/addresses");
const provider_1 = require("@app/blockchain/provider");
async function getBondPrice(bond) {
    const contract = new ethers_1.ethers.Contract(addresses_1.BONDS[bond], TimeBondDepository_json_1.default, (0, provider_1.getProvider)());
    try {
        const priceUSD = await contract.bondPriceInUSD();
        // console.log(
        //   `🔥 bond ${bond} price ${bond === BondType.timeAvax ? 'AVAX' : 'USD'}: `,
        //   ethers.utils.formatUnits(priceUSD as ethers.BigNumber, 'ether')
        // );
        return Number(ethers_1.ethers.utils.formatUnits(priceUSD, 'ether'));
    }
    catch (e) {
        console.log('🔥 getBondPrice', e);
    }
}
exports.getBondPrice = getBondPrice;
