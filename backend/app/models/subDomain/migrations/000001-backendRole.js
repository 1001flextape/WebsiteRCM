
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendRole', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: sequelize.DATE
    },
    isDefault: {
      type: sequelize.BOOLEAN,
      default: false,  
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
  await queryInterface.dropTable('backendRole');
}

module.exports = { up, down };