"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const patientEntries_1 = __importDefault(require("../../data/patientEntries"));
const genID = () => {
    const buf = Buffer.allocUnsafe(16);
    buf.writeDoubleBE(Date.now());
    buf.writeDoubleBE(Math.random(), 8);
    return buf.toString('hex');
};
const getEntries = () => {
    // return patientData;
    return patientEntries_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};
const addPatient = (patient) => {
    const newPatientEntry = Object.assign({ id: genID() }, patient);
    patientEntries_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getEntries, addPatient,
};
