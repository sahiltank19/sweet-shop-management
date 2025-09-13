'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Student.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    roll_number: { type: DataTypes.STRING(50) },
    course: { type: DataTypes.STRING(50) },
    track: { type: DataTypes.STRING(50) },
    tenth_percentage: { type: DataTypes.DECIMAL(5,2) },
    tenth_year: { type: DataTypes.INTEGER },
    tenth_board: { type: DataTypes.STRING(100) },
    twelfth_percentage: { type: DataTypes.DECIMAL(5,2) },
    twelfth_year: { type: DataTypes.DATE },
    twelfth_board: { type: DataTypes.STRING(100) },
    ug_degree: { type: DataTypes.STRING(100) },
    ug_branch: { type: DataTypes.STRING(100) },
    ug_percentage: { type: DataTypes.DECIMAL(5,2) },
    ug_past_backlogs: { type: DataTypes.INTEGER },
    ug_active_backlogs: { type: DataTypes.INTEGER },
    ug_year: { type: DataTypes.INTEGER },
    ug_college: { type: DataTypes.STRING(255) },
    ug_university: { type: DataTypes.STRING(255) },
    ug_city: { type: DataTypes.STRING(100) },
    pg_degree: { type: DataTypes.STRING(100) },
    pg_branch: { type: DataTypes.STRING(100) },
    pg_percentage: { type: DataTypes.DECIMAL(5,2) },
    pg_year: { type: DataTypes.INTEGER },
    pg_college: { type: DataTypes.STRING(255) },
    pg_university: { type: DataTypes.STRING(255) },
    pg_city: { type: DataTypes.STRING(100) },
    resume_path: { type: DataTypes.STRING(255) }
  }, {
    sequelize,
    modelName: 'Student'
  });

  return Student;
};

