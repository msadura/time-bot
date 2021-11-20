"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeBondDepository = exports.JoeRouter = exports.StakingContract = void 0;
var StakingContract_json_1 = require("./StakingContract.json");
Object.defineProperty(exports, "StakingContract", { enumerable: true, get: function () { return StakingContract_json_1.abi; } });
var JoeRouter02_json_1 = require("./JoeRouter02.json");
Object.defineProperty(exports, "JoeRouter", { enumerable: true, get: function () { return __importDefault(JoeRouter02_json_1).default; } });
var TimeBondDepository_json_1 = require("./TimeBondDepository.json");
Object.defineProperty(exports, "TimeBondDepository", { enumerable: true, get: function () { return __importDefault(TimeBondDepository_json_1).default; } });
