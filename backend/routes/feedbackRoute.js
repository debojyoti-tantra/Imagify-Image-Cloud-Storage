import express from 'express';
import { addFeedback, getAllFeedback } from '../controller/feedbackController.js';

const router = express.Router();

router.route('/addfeedback').post(addFeedback);
router.route('/getallfeedbacks').get(getAllFeedback);

export default router;