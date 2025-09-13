'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // If the Students table exists with old columns, drop them
    // Use try/catch to be resilient if columns do not exist
    const tableDesc = await queryInterface.describeTable('Students').catch(() => null);
    if (tableDesc) {
      const maybeDrop = async (col) => {
        if (tableDesc[col]) {
          await queryInterface.removeColumn('Students', col);
        }
      };
      await maybeDrop('branch');
      await maybeDrop('year');
      await maybeDrop('cgpa');
    }
  },
  async down(queryInterface, Sequelize) {
    // Cannot reliably restore without types, skip
  }
};

