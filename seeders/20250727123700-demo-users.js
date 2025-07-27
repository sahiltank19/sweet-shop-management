'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'admin',
      email: 'admin@sweetshop.com',
      password: '$2a$10$E3DgchtVry3qlYlzQPsQe.F7vG3dQ/4CbP3FcNGftjCJ3gEsiQ5D6', // password = "admin123"
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'customer1',
      email: 'customer1@sweetshop.com',
      password: '$2a$10$E3DgchtVry3qlYlzQPsQe.F7vG3dQ/4CbP3FcNGftjCJ3gEsiQ5D6', // password = "admin123"
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};