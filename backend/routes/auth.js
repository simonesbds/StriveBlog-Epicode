import express from 'express';
import { login, me } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import passport from 'passport';

const router = express.Router();

router.post('/login', login);

router.get('/me', authenticate, me);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  const { token } = req.user;
  res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
});

export default router;