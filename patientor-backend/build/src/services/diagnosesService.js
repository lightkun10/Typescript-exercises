"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoseEntries_json_1 = __importDefault(require("../../data/diagnoseEntries.json"));
const getEntries = () => {
    return diagnoseEntries_json_1.default;
};
const addEntries = () => {
    return null;
};
exports.default = {
    getEntries, addEntries
};
