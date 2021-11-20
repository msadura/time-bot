"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@app/time/types");
const getTimePrice_1 = require("@app/time/getTimePrice");
const getBondPrice_1 = require("@app/time/getBondPrice");
async function getBondDiscount(bond, timePrice) {
    const tokenPrice = timePrice || (await (0, getTimePrice_1.getTimePrice)());
    const bondPrice = await (0, getBondPrice_1.getBondPrice)(bond);
    let discount = null;
    if (!tokenPrice || !bondPrice) {
        return;
    }
    if (bond === types_1.BondType.timeAvax) {
        discount = (tokenPrice.avax / bondPrice - 1) * 100;
    }
    else {
        discount = (tokenPrice.usd / bondPrice - 1) * 100;
    }
    return discount;
}
exports.default = getBondDiscount;
