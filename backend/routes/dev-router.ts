import express from 'express';

import { getAllDev, createDev, deleteDev, getDevById } from '../controllers/dev-controller';

const devRouter = express.Router();

//devRouter.route('/login/accounts').get(getAllDev);
devRouter.route('/login/:id').get(getDevById);
devRouter.route('/login').post(createDev);

export default devRouter;