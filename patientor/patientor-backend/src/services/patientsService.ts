import patientData from '../../data/patientEntries.json';
import { Patient } from '../types';

const getEntries = (): Array<Patient> => {
  // return patientData;
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation }) =>
      ({ id, name, dateOfBirth, gender, occupation })
  );
};

const addEntry = () => {
  return null;
};

export default {
  getEntries, addEntry,
};