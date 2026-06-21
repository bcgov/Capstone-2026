import express from 'express';

import { getDevData, createDev } from '../controllers/dev-controller';

const devRouter = express.Router();

devRouter.route('/login/:id').get(getDevData);
devRouter.route('/login').post(createDev);

export default devRouter;