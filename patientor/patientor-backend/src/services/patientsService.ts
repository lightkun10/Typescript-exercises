/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from '../../data/patientEntries';
import { NewPatientEntry, Patient, PatientEntry } from '../types';

const genID = () => {
  const buf = Buffer.allocUnsafe(16);
	buf.writeDoubleBE(Date.now());
	buf.writeDoubleBE(Math.random(), 8);
	return buf.toString('hex');
};

const getEntries = (): Array<Patient> => {
  // return patientData;
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation }) =>
      ({ id, name, dateOfBirth, gender, occupation })
  );
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: genID(),
    ...patient
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries, addPatient,
};