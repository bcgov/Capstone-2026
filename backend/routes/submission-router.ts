import express from 'express';

import { getSubmissionById, getAllSubmissions, createSubmission, deleteSubmission } from '../controllers/submission-controller';

const submissionRouter = express.Router();

submissionRouter.route('/submissions/:id').get(getSubmissionById);
submissionRouter.route('/submissions').get(getAllSubmissions);
submissionRouter.route('/submissions').post(createSubmission);
submissionRouter.route('/submissions/:id').delete(deleteSubmission);

export default submissionRouter;