
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('clientSiteColumn', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    width: {
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
  await queryInterface.dropTable('clientSiteColumn');
}

module.exports = { up, down };