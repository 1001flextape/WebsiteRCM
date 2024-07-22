const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingBackgroundColor', [
    {
      id: uuidv4(),
      backgroundColor_day: "#f1f4f5",
      backgroundColor_night: "#010405",
      isReady: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('backendSettingBackgroundColor', {});
}

module.exports = { up, down };

