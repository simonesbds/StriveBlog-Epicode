import Author from '../models/Author.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const author = await Author.findOne({ email });
  if (!author) return res.status(404).json({ message: 'Utente non trovato' });

  const valid = await bcrypt.compare(password, author.password);
  if (!valid) return res.status(401).json({ message: 'Password errata' });

  const token = jwt.sign({ id: author._id, email: author.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

export const me = async (req, res) => {
  const author = await Author.findById(req.user.id);
  res.json(author);
};