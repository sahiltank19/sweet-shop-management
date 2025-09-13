'use strict';

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    rollNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'roll_number'
    },
    course: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    track: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tenthPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      field: 'tenth_percentage'
    },
    tenthYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'tenth_year'
    },
    tenthBoard: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'tenth_board'
    },
    twelfthPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      field: 'twelfth_percentage'
    },
    twelfthYear: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'twelfth_year'
    },
    twelfthBoard: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'twelfth_board'
    },
    ugDegree: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'ug_degree'
    },
    ugBranch: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'ug_branch'
    },
    ugPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      field: 'ug_percentage'
    },
    ugPastBacklogs: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ug_past_backlogs'
    },
    ugActiveBacklogs: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ug_active_backlogs'
    },
    ugYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ug_year'
    },
    ugCollege: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'ug_college'
    },
    ugUniversity: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'ug_university'
    },
    ugCity: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'ug_city'
    },
    pgDegree: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'pg_degree'
    },
    pgBranch: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'pg_branch'
    },
    pgPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      field: 'pg_percentage'
    },
    pgYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'pg_year'
    },
    pgCollege: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'pg_college'
    },
    pgUniversity: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'pg_university'
    },
    pgCity: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'pg_city'
    },
    resumePath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'resume_path'
    }
  }, {
    tableName: 'students',
    underscored: true,
    timestamps: true
  });

  Student.associate = (models) => {
    if (models.User) {
      Student.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  };

  return Student;
};

