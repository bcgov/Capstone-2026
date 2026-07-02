import express from 'express';

import { createForm, deleteForm, getFormById, getForms, updateQuestion, deleteQuestion, test, getFormsByOwnerId } from '../controllers/form-controller';

const dataRouter = express.Router();

dataRouter.route('/form').get(getForms);
dataRouter.route('/form').post(createForm);
dataRouter.route('/form/owner/:ownerId').get(getFormsByOwnerId);
dataRouter.route('/form/:id').get(getFormById);
dataRouter.route('/form/:id').delete(deleteForm);

dataRouter.route('/form/:formId/:questionId').patch(updateQuestion);
dataRouter.route('/form/:formId/:questionId/order').patch(updateQuestion);
dataRouter.route('/form/:formId/:questionId').delete(deleteQuestion);

dataRouter.route('/test').get(test);

export default dataRouter;