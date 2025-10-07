const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

console.log('🔍 Loading Post model...'); // Debug log

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: [1, 255],
      notNull: {
        msg: 'Post title cannot be null'
      }
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Post content cannot be null'
      }
    }
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Post user_id cannot be null'
      }
    },
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'posts',
  hooks: {
    beforeValidate: (post) => {
      console.log('🔍 Post beforeValidate:', {
        title: post.title,
        content: post.content,
        user_id: post.user_id
      });
    }
  }
});

console.log('✅ Post model defined');

module.exports = Post;