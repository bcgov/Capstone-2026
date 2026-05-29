import express from 'express';

import { createForm, deleteForm, getForms, test } from '../controllers/form-controller';

const dataRouter = express.Router();

dataRouter.route('/form').get(getForms);
//make get id endpoint for form here when we have the get id function in the controller
dataRouter.route('/form').post(createForm);
dataRouter.route('/form/:id').delete(deleteForm);

dataRouter.route('/test').get(test);

export default dataRouter;