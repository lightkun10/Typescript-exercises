import express from 'express';
const app = express();

import { calculateBmi as CalculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
  // console.log(req.query);
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  
  if (isNaN(height) || isNaN(weight) 
      || !height || !weight ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.status(200).json({
    weight,
    height,
    bmi: CalculateBmi(height, weight),
  })
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});