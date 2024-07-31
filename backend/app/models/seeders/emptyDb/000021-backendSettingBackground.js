const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingBackgroundColor', [
    {
      id: uuidv4(),
      backgroundColor_day: "#f7f2f6",
      backgroundColor_night: "#2f2f2f",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
}

module.exports = { up, down };
