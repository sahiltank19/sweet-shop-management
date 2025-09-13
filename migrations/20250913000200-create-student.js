'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      roll_number: { type: Sequelize.STRING(50) },
      course: { type: Sequelize.STRING(50) },
      track: { type: Sequelize.STRING(50) },
      tenth_percentage: { type: Sequelize.DECIMAL(5,2) },
      tenth_year: { type: Sequelize.INTEGER },
      tenth_board: { type: Sequelize.STRING(100) },
      twelfth_percentage: { type: Sequelize.DECIMAL(5,2) },
      twelfth_year: { type: Sequelize.DATE },
      twelfth_board: { type: Sequelize.STRING(100) },
      ug_degree: { type: Sequelize.STRING(100) },
      ug_branch: { type: Sequelize.STRING(100) },
      ug_percentage: { type: Sequelize.DECIMAL(5,2) },
      ug_past_backlogs: { type: Sequelize.INTEGER },
      ug_active_backlogs: { type: Sequelize.INTEGER },
      ug_year: { type: Sequelize.INTEGER },
      ug_college: { type: Sequelize.STRING(255) },
      ug_university: { type: Sequelize.STRING(255) },
      ug_city: { type: Sequelize.STRING(100) },
      pg_degree: { type: Sequelize.STRING(100) },
      pg_branch: { type: Sequelize.STRING(100) },
      pg_percentage: { type: Sequelize.DECIMAL(5,2) },
      pg_year: { type: Sequelize.INTEGER },
      pg_college: { type: Sequelize.STRING(255) },
      pg_university: { type: Sequelize.STRING(255) },
      pg_city: { type: Sequelize.STRING(100) },
      resume_path: { type: Sequelize.STRING(255) },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};

