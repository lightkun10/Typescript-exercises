import diagnosesData from '../../data/diagnoseEntries.json';

import { DiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnosesData;
};

const addEntries = () => {
  return null;
};

export default {
  getEntries, addEntries
};
