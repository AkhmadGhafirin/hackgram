'use strict';

const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post)
      User.hasOne(models.Profile)
    }

    getUsernameAndRole() {
      return this.username ? `${this.username} - ${this.role}` : this.role
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      validate: {
        notNull: {
          msg: 'Email is required!'
        },
        notEmpty: {
          msg: 'Email is required!'
        },
        isEmail: {
          msg: 'Email is invalid!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required!'
        },
        notEmpty: {
          msg: 'Password is required!'
        },
        minLength(value) {
          if (value.length < 8) throw ('Password min 8 character')
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role is required!'
        },
        notEmpty: {
          msg: 'Role is required!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(user.password, salt)
    user.createdAt = new Date()
    user.updatedAt = new Date()
  })

  User.beforeUpdate((user) => {
    user.updatedAt = new Date()
  })

  return User;
};