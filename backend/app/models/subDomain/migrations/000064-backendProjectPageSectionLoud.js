
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendProjectPageSectionLoud', {
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
    
    // GUI
    name: {
      type: sequelize.STRING,
    },
    author: {
      type: sequelize.STRING,
    },
    webAssetImport: {
      type: sequelize.STRING,
    },
    menuJsonB: {
      type: sequelize.JSONB,
    },
    userAnswersJsonB: {
      type: sequelize.JSONB,
    },
    isReady: {
      type: sequelize.BOOLEAN,
    },

    //selection
    selectionType: {
      type: sequelize.ENUM("BUILT_IN", "PLUGIN", "MARKET"),
    },
    selectionId: {
      type: sequelize.UUID,
    },

    // reference
    pageId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'backendProjectPage',
        key: 'id',
      }
    },

    // standard
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
  await queryInterface.dropTable('backendProjectPageSectionLoud');
}

module.exports = { up, down };