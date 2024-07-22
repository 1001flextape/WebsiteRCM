
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSettingBackgroundColor', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    backgroundColor_day: {
      type: sequelize.STRING,
    },
    backgroundColor_night: {
      type: sequelize.STRING,
    },
    
    isChanged: {
      type: sequelize.BOOLEAN,
      default: false,
    },
    isReady: {
      type: sequelize.BOOLEAN,
      default: false,
    },
    createdAt: {
      allowNull: false,
      type: sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: sequelize.DATE
    },
    deletedAt: {
      type: sequelize.DATE
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('backendSettingBackgroundColor');
}

module.exports = { up, down };