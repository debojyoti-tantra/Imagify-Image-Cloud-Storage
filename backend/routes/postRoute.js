import express from 'express';
import { createPost, getUserAllPost, getPost, deletePost } from '../controller/postController.js';
import upload from '../middlewares/multer.js';
import isAuthenticated from '../middlewares/auth.js';

const router = express.Router();

router.route('/add').post(isAuthenticated, upload.single('image'), createPost);
router.route('/userallpost').get(isAuthenticated, getUserAllPost);
router.route('/getpost/:id').get(isAuthenticated, getPost);
router.route('/delete/:id').delete(isAuthenticated, deletePost);

export default router;