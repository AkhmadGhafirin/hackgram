'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.hasMany(models.Post)
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Tag already in exist!'
      },
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
    modelName: 'Tag',
  });

  Tag.beforeCreate((tag) => {
    tag.createdAt = new Date()
    tag.updatedAt = new Date()
  })

  return Tag;
};