/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import cors from 'cors';

import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patientRoutes';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

const router = express.Router();

router.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

/** Routers */
app.use('/api', router);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});