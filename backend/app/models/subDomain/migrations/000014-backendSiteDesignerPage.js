
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSiteDesignerPage', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    slug: {
      type: sequelize.STRING,
      allowNull: false,
    },
    isReady: {
      type: sequelize.BOOLEAN
    },
    isPublished: {
      type: sequelize.BOOLEAN,
      default: false,
    },
    isChanged: {
      type: sequelize.BOOLEAN,
      default: false,
    },
    isDraft: {
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