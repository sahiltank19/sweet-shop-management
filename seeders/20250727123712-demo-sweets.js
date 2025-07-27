'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sweets', [{
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: 1.99,
      quantity: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Gummy Bears',
      category: 'Gummy',
      price: 2.49,
      quantity: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Lollipop',
      category: 'Hard Candy',
      price: 0.99,
      quantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Caramel Chews',
      category: 'Caramel',
      price: 1.49,
      quantity: 40,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sweets', null, {});
  }
};