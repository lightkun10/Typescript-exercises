/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  try {
    const patient = patientService.getPatientByID(req.params.id);
    // console.log(patient);
    res.send(patient);
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e.message);
  } 
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;