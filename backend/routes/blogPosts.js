import express from 'express';
import { getBlogPosts, getBlogPost, createBlogPost, updateBlogPost, deleteBlogPost, getComments, addComment, updateComment, deleteComment } from '../controllers/blogPostController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/:id', getBlogPost);
router.post('/', authenticate, createBlogPost);
router.put('/:id', authenticate, updateBlogPost);
router.delete('/:id', authenticate, deleteBlogPost);

router.get('/:id/comments', getComments);
router.post('/:id/comments', authenticate, addComment);
router.put('/:id/comments/:commentId', authenticate, updateComment);
router.delete('/:id/comments/:commentId', authenticate, deleteComment);

export default router;