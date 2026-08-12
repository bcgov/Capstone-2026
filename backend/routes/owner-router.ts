import express from 'express';

import { createOwner, getOwnerById } from '../controllers/owner-controller';

const devRouter = express.Router();

devRouter.route('/login/:id').get(getOwnerById);
devRouter.route('/login').post(createOwner);

export default devRouter;