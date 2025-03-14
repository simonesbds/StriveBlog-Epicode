
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

const BlogPostSchema = new mongoose.Schema({
  category: String,
  title: String,
  cover: String,
  readTime: { value: Number, unit: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  content: String,
  comments: [CommentSchema]
}, { timestamps: true });

export default mongoose.model('BlogPost', BlogPostSchema);