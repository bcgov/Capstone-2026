import express from 'express';
import checkHealth from '../controllers/health-controller';

const healthRouter = express.Router();

healthRouter.route('/health').get(checkHealth);

export default healthRouter;