'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: 'UserId' })
    }

    fullName() {
      return `${this.firstName} ${this.lastName}`
    }

  }
  Profile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    profilePicture: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });

  Profile.beforeCreate((profile) => {
    profile.createdAt = new Date()
    profile.updatedAt = new Date()
  })

  Profile.beforeUpdate((profile) => {
    profile.updatedAt = new Date()
  })

  return Profile;
};