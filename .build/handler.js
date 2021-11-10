"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
require("./src/aliases");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const checkAndAlert_1 = __importDefault(require("./src/time/checkAndAlert"));
const provider_1 = require("./src/blockchain/provider");
async function run() {
    await (0, provider_1.connectProvider)();
    (0, checkAndAlert_1.default)();
}
exports.run = run;
