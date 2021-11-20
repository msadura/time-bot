"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@app/time/types");
const getBondDiscount_1 = __importDefault(require("@app/time/getBondDiscount"));
const getTimePrice_1 = require("@app/time/getTimePrice");
async function getDiscounts() {
    const tokenPrice = await (0, getTimePrice_1.getTimePrice)();
    const promises = Object.values(types_1.BondType).map(bond => (0, getBondDiscount_1.default)(bond, tokenPrice));
    const res = await Promise.all(promises);
    const discounts = Object.values(types_1.BondType).map((bond, i) => ({
        bond,
        discount: res[i]
    }));
    return discounts;
}
exports.default = getDiscounts;
