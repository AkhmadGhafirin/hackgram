'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Posts', 'content', {
      type: Sequelize.TEXT
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Posts', 'content', {
      type: Sequelize.STRING
    })
  }
};
