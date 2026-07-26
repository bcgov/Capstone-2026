import app from './express';
import dataRouter from "./routes/form-router";
import healthRouter from "./routes/health-router";
import submissionRouter from './routes/submission-router';
import userRouter from './routes/user-router';
import { createForm } from './controllers/form-controller';
import ownerRouter from './routes/owner-router';
import * as jwt from 'jsonwebtoken';
import metabaseRouter from './routes/metabase';

const port = 3000;

app.use('/api', healthRouter);
app.use('/api', dataRouter);
app.use('/api', submissionRouter);
app.use('/api', userRouter);
app.use('/api', ownerRouter);
app.use('/api', metabaseRouter);

app.get('/hello', (req, res) => {
  res.send('hello world');
});

app.post('/api/form', (req, res) => {
  createForm(req, res);
});



// you will need to install via 'npm install jsonwebtoken' or in your package.json

app.get('/api/metabase', (req, res) => {
  const METABASE_SECRET_KEY = process.env.METABASE_SECURE_KEY;
  const payload = {
    resource: { dashboard: 2 },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
  };
  const token = jwt.sign(payload, METABASE_SECRET_KEY as string);
  res.json({token: token});
}); 

app.listen(port, () => {
  console.info(`[server]: Server started on port ${port}`);
});