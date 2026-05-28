import express from 'express';

console.log("DATA ROUTER LOADED");

import { createForm, deleteForm, getForms, test } from '../controllers/report-controller';

const dataRouter = express.Router();

dataRouter.route('/form').get(getForms);
dataRouter.route('/form').post(createForm);
dataRouter.route('/form/:id').delete(deleteForm);

dataRouter.route('/test').get(test);

export default dataRouter;