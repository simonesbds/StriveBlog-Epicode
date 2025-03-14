import Author from '../models/Author.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAuthors = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const authors = await Author.find()
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  const total = await Author.countDocuments();
  res.json({ authors, totalPages: Math.ceil(total / limit), currentPage: parseInt(page) });
};

export const getAuthor = async (req, res) => {
  const author = await Author.findById(req.params.id);
  res.json(author);
};

export const createAuthor = async (req, res) => {
  const { nome, cognome, email, password, dateOfBirth } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const author = new Author({ nome, cognome, email, password: hashedPassword, dateOfBirth });
  await author.save();
  res.status(201).json(author);
};

export const updateAuthor = async (req, res) => {
  const updated = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteAuthor = async (req, res) => {
  await Author.findByIdAndDelete(req.params.id);
  res.json({ message: "Autore eliminato" });
};

export const uploadAvatar = async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, { avatar: req.file.path }, { new: true });
  res.json(author);
};