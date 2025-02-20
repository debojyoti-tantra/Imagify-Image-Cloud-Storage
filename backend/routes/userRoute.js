import express from 'express';
import {signUp} from '../controller/userController.js';

const router = express.Router();

router.route('/signup').post(signUp);

export default router;