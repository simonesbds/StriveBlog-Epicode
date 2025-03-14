import express from 'express';
import { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor, uploadAvatar } from '../controllers/authorController.js';
import { upload } from '../middleware/cloudinary.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAuthors);
router.get('/:id', getAuthor);
router.post('/', createAuthor);
router.put('/:id', authenticate, updateAuthor);
router.delete('/:id', authenticate, deleteAuthor);
router.patch('/:id/avatar', authenticate, upload.single('avatar'), uploadAvatar);

export default router;