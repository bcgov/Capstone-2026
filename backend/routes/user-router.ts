import express from 'express';

import { getUserDataById, getAllUserData, createUserData } from '../controllers/user-controller';

const userRouter = express.Router();

userRouter.route('/users/:id').get(getUserDataById);
userRouter.route('/users').get(getAllUserData);
userRouter.route('/users').post(createUserData);

export default userRouter;