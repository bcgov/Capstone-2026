import express from 'express';

import { createForm, deleteForm, getFormById, getForms test } from '../controllers/form-controller';

const dataRouter = express.Router();

dataRouter.route('/form').get(getForms);
dataRouter.route('/form/:id').get(getFormById);
dataRouter.route('/form').post(createForm);
dataRouter.route('/form/:id').delete(deleteForm);

dataRouter.route('/test').get(test);

export default dataRouter;