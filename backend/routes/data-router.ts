import express from 'express';
import {createForm,deleteForm,getForms, test} from '../controllers/report-controller';

const router = express.Router();

router.route('/form').get(getForms);
router.route('/form').post(createForm);
router.route('/form/:id').delete(deleteForm);

router.route('/test').get(test);
export default router;