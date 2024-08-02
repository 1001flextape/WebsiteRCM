const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingColumn', [
    {
      id: uuidv4(),
      width: "1000px",
      isReady: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('backendSettingColumn', {});
}

module.exports = { up, down };

