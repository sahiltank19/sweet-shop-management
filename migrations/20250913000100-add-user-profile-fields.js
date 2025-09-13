'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'first_name', {
      type: Sequelize.STRING(100),
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'last_name', {
      type: Sequelize.STRING(100),
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'contact_number', {
      type: Sequelize.STRING(20),
      allowNull: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'contact_number');
    await queryInterface.removeColumn('Users', 'last_name');
    await queryInterface.removeColumn('Users', 'first_name');
  }
};

