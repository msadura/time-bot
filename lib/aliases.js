"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = __importDefault(require("module-alias"));
const path_1 = __importDefault(require("path"));
const IS_DEV = process.env.NODE_ENV === 'development' || !__dirname.endsWith('lib');
const rootPath = path_1.default.resolve(__dirname, '..');
const rootPathDev = path_1.default.resolve(rootPath, 'src');
const rootPathProd = path_1.default.resolve(rootPath, 'lib');
module_alias_1.default.addAliases({
    '@app': IS_DEV ? rootPathDev : rootPathProd
});
