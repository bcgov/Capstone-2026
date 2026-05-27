import app from './express';
import reportRoutes from "./routes/data-router";

const port = 3000;

app.use(reportRoutes);

app.get('/hello', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.info(`[server]: Server started on port ${port}`);
});