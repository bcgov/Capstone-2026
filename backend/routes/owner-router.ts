import express from 'express';

import { getAllOwners, createOwner, deleteOwner, getOwnerById } from '../controllers/owner-controller';

const devRouter = express.Router();

//devRouter.route('/login/accounts').get(getAllOwners);
devRouter.route('/login/:id').get(getOwnerById);
devRouter.route('/login').post(createOwner);

export default devRouter;