'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: { name: 'UserId' } })
      Post.belongsTo(models.Tag, { foreignKey: { name: 'TagId' } })
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required!'
        },
        notEmpty: {
          msg: 'Title is required!'
        }
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Content is required!'
        },
        notEmpty: {
          msg: 'Content is required!'
        }
      }
    },
    imgUrl: DataTypes.STRING,
    like: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    TagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Tag is required!'
        },
        notEmpty: {
          msg: 'Tag is required!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });

  Post.beforeCreate((post) => {
    post.like = 0
    post.createdAt = new Date()
    post.updatedAt = new Date()
  })

  Post.beforeUpdate((post) => {
    post.updatedAt = new Date()
  })

  return Post;
};