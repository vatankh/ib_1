const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

console.log('🔍 Loading User model...'); // Debug log

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 50],
      isAlphanumeric: true
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
}, {
  tableName: 'users',
  hooks: {
    beforeSave: async (user) => {
      console.log('🔍 User beforeSave hook triggered');
      if (user.changed('password_hash')) {
        console.log('🔍 Hashing password...');
        user.password_hash = await bcrypt.hash(user.password_hash, 12);
      }
    },
    beforeValidate: (user) => {
      console.log('🔍 User beforeValidate:', {
        username: user.username,
        email: user.email
      });
    }
  }
});

// Instance method to check password
User.prototype.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

// Instance method to safe user data (without password)
User.prototype.toSafeObject = function() {
  const { password_hash, ...safeUser } = this.get();
  return safeUser;
};

console.log('✅ User model defined');

module.exports = User;