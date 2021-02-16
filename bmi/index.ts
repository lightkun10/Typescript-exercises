import express from 'express';
const app = express();

app.use(express.json());

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

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
    bmi: calculateBmi(height, weight),
  });
});

app.post('/exercises', (req, res) => {
  console.log(req.body);

  if (!('daily_exercises' in req.body && 'target' in req.body)) {
    res.status(400).json({ error: "parameters missing" });
  }

  const { daily_exercises, target } = req.body
  
  if(isNaN(target) || target < 0
      || !Array.isArray(daily_exercises) || daily_exercises.length < 1
      || daily_exercises.every((e) => isNaN(e))) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  
  
  res.status(200).json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});