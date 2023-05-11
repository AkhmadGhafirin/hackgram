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
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    like: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};