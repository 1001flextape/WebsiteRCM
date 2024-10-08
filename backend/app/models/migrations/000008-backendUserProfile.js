
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendUserProfile', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'backendUser',
        key: 'id',
      }
    },
    displayName: {
      type: sequelize.STRING,
    },
    firstName: {
      type: sequelize.STRING,
    },
    lastName: {
      type: sequelize.STRING,
    },
    username: {
      type: sequelize.STRING,
    },
    picture: {
      type: sequelize.STRING,
    },
    callByType: {
      type: sequelize.STRING,
    },
    circleColor: {
      type: sequelize.STRING,
    },
    labelColor: {
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
      allowNull: true,
      type: sequelize.DATE
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('backendUserProfile');
}

module.exports = { up, down };