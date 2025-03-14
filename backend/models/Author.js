
import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  nome: String,
  cognome: String,
  email: { type: String, unique: true },
  password: String,
  avatar: String,
  dateOfBirth: String
});

export default mongoose.model('Author', AuthorSchema);