
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendProjectPage', {
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
    slug: {
      type: sequelize.STRING,
      allowNull: false,
    },
    
    
    isPublished: {
      type: sequelize.BOOLEAN,
      default: false,
    },
    isDraft: {
      type: sequelize.BOOLEAN,
      default: false,
    },
    isNew: {
      type: sequelize.BOOLEAN,
      default: false,
    },
    isChanged: {
      type: sequelize.BOOLEAN,
      default: false,
    },
    isDeleted: {
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
  await queryInterface.dropTable('backendProjectPage');
}

module.exports = { up, down };