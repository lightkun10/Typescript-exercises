/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from '../../data/patients';
import { NewPatientEntry, NonSsnPatient, Patient } from '../types';

const genID = () => {
  const buf = Buffer.allocUnsafe(16);
	buf.writeDoubleBE(Date.now());
	buf.writeDoubleBE(Math.random(), 8);
	return buf.toString('hex');
};

const getPatients = (): Array<NonSsnPatient> => {
 return patientData.map((patient) => {
   return { ...patient, ssn: undefined };
 });
};

// const getPatientByID = (id: string): Patient | undefined => {
//   const p = patientData.find((patient) => patient.id === id);
//   return p;
// };

const getPatientByID = (id: string): Patient | undefined => {
  const p = patientData.find((patient) => patient.id === id);
  return p;
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: genID(),
    ...patient
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients, addPatient, getPatientByID
};