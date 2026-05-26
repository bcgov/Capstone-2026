import app from './express';
import reportRoutes from "./routes/data-router";

const port = 3000;

app.listen(port, () => {
  console.info(`[server]: Server started on port ${port}`);
});