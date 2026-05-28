import app from './express';
import dataRouter from "./routes/form-router";
import healthRouter from "./routes/health-router";

const port = 3000;

app.use('/api', healthRouter);
app.use('/api', dataRouter);

app.get('/hello', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.info(`[server]: Server started on port ${port}`);
});
