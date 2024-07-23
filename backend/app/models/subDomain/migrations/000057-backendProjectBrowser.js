
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendProjectBrowser', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    
    // connect records to project
    projectId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'backendProject',
        key: 'id',
      }
    },
    
    favicon: {
      type: sequelize.STRING,
    },
    tab: {
      type: sequelize.STRING,
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
  await queryInterface.dropTable('backendProjectBrowser');
}

module.exports = { up, down };