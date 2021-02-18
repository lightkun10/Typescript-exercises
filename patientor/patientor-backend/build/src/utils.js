"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name}`);
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date of birth: ${date}`);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};
const toNewPatientEntry = (object) => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        ssn: parseSsn(object.ssn),
    };
};
exports.default = toNewPatientEntry;
