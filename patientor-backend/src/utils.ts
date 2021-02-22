/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entry, Gender, NewPatientEntry, BaseEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "./types";

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isBaseEntry = (param: any): param is BaseEntry => {
  const p = param as BaseEntry;

  if (!isString(p.description)) {
    return false;
  }

  if (!isString(p.date) && !isDate(p.date)) {
    return false;
  }

  if (!isString(p.specialist)) {
    return false;
  }

  if (typeof (p.diagnosisCodes) === 'undefined') {
    return false;
  }

  return Array.isArray(p.diagnosisCodes) && 
    p.diagnosisCodes.every((code) => typeof code === 'string');
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date of birth: ${date}`);
  }

  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }

  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

const parseHospitalEntry = (obj: HospitalEntry): HospitalEntry => {
  return {
    ...obj,
    type: obj.type,
    discharge: {
      date: obj.discharge.date,
      criteria: obj.discharge.criteria,
    }
  };
};

const parseOccupationalHealthCareEntry = (obj: OccupationalHealthcareEntry): OccupationalHealthcareEntry => {
  if (obj.sickLeave) {
    return {
      ...obj,
      type: obj.type,
      employerName: obj.employerName,
  
      sickLeave: {
        startDate: obj.sickLeave?.startDate,
        endDate: obj.sickLeave?.endDate,
      }
    };
  }

  return {
    ...obj,
    type: obj.type,
    employerName: obj.employerName,
  };
};

const parseHealthCheckEntry = (obj: HealthCheckEntry): HealthCheckEntry => {
  return {
    ...obj,
    healthCheckRating: obj.healthCheckRating,
  };
};

const getEntry = (obj: Entry): Entry => {
  switch (obj.type) {
    case "Hospital":
      return parseHospitalEntry(obj);
    case "OccupationalHealthcare":
      return parseOccupationalHealthCareEntry(obj);
    case "HealthCheck":
      return parseHealthCheckEntry(obj);
    default:
      return assertNever(obj);
  }
};

const parseEntry = (entry: any): Entry => {
  // if (!entry || !isEntry(entry)) {
  if (!entry) {
    throw new Error(`Malformed entry: ${JSON.stringify(entry)}`);
  }

  return getEntry(entry);
};


const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    ssn: parseSsn(object.ssn),
    entries: [],
  };
};

const toNewEntryForPatient = (object: any): Entry => {
  // Check for baseEntry
  // Check for each type of entry
  return parseEntry(object);
};

export {
  toNewPatientEntry, toNewEntryForPatient
};