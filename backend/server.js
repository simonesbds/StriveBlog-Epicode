
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';
import './passport.js';

import authorRoutes from './routes/authors.js';
import blogRoutes from './routes/blogPosts.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/authors', authorRoutes);
app.use('/blogPosts', blogRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));
