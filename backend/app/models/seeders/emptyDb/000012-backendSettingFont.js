const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingFont', [
    {
      id: uuidv4(),
      font: "Candara",
      isReady: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('backendSettingFont', {});
}

module.exports = { up, down };

