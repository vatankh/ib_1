const { Post, User } = require('../models');
const { Op } = require('sequelize');

const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Build where clause based on user role
    // Since all access is now authenticated, we don't need the unauthenticated branch
    let whereClause = {};

    if (req.user.role === 'admin') {
      // Admin can see all posts
      whereClause = {};
    } else {
      // Regular users can see public posts and their own posts
      whereClause = {
        [Op.or]: [
          { is_public: true },
          { user_id: req.user.id }
        ]
      };
    }

    const { count, rows: posts } = await Post.findAndCountAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'username']
      }],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      error: 'Failed to fetch posts',
      message: 'An error occurred while fetching posts'
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, is_public = true } = req.body;

    const post = await Post.create({
      title,
      content,
      is_public,
      user_id: req.user.id
    });

    // Fetch post with author info
    const newPost = await Post.findByPk(post.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'username']
      }]
    });

    res.status(201).json({
      message: 'Post created successfully',
      post: newPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      error: 'Failed to create post',
      message: 'An error occurred while creating post'
    });
  }
};

module.exports = {
  getPosts,
  createPost
};