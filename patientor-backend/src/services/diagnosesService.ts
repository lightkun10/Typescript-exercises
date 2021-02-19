import diagnosesData from '../../data/diagnoseEntries.json';

import { Diagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
  return diagnosesData;
};

const addEntries = () => {
  return null;
};

export default {
  getEntries, addEntries
};
