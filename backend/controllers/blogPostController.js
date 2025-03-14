import BlogPost from '../models/BlogPost.js';

export const getBlogPosts = async (req, res) => {
  const { page = 1, limit = 10, title = "" } = req.query;
  const query = title ? { title: { $regex: title, $options: 'i' } } : {};
  const posts = await BlogPost.find(query).populate('author')
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  const total = await BlogPost.countDocuments(query);
  res.json({ posts, totalPages: Math.ceil(total / limit), currentPage: parseInt(page) });
};

export const getBlogPost = async (req, res) => {
  const post = await BlogPost.findById(req.params.id).populate('author');
  res.json(post);
};

export const createBlogPost = async (req, res) => {
  const post = new BlogPost({ ...req.body, author: req.user.id });
  await post.save();
  res.status(201).json(post);
};

export const updateBlogPost = async (req, res) => {
  const updated = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteBlogPost = async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.json({ message: "Post eliminato" });
};

export const getComments = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.json(post.comments);
};

export const addComment = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  post.comments.push({ text: req.body.text, author: req.user.id });
  await post.save();
  res.status(201).json(post.comments);
};

export const updateComment = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  const comment = post.comments.id(req.params.commentId);
  comment.text = req.body.text;
  await post.save();
  res.json(comment);
};

export const deleteComment = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  post.comments.id(req.params.commentId).remove();
  await post.save();
  res.json({ message: "Commento eliminato" });
};