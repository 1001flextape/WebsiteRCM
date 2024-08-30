
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSiteDesignerPage', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    isReady: {
      type: sequelize.BOOLEAN
    },
    slug: {
      type: sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: sequelize.ENUM("NEW", "DRAFT", "PUBLISHED"),
      default: "NEW",
    },
    isChanged: {
      type: sequelize.BOOLEAN,
      default: false,
    },
    isRecentlyCreated: {
      type: sequelize.BOOLEAN,
      default: true,
    },
    isRecentlyDeleted: {
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
  await queryInterface.dropTable('backendSiteDesignerPage');
}

module.exports = { up, down };