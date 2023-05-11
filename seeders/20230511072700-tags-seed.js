'use strict';

const tags = [
  {
    name: 'Game'
  },
  {
    name: 'Food'
  },
  {
    name: 'Work'
  },
  {
    name: 'Sport'
  },
  {
    name: 'Art'
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    const insertData = tags.map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    return queryInterface.bulkInsert('Tags', insertData, {})
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tags', null, {})
  }
};
