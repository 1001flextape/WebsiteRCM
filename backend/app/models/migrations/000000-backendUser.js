
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendUser', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: sequelize.STRING,
    },
    password: {
      type: sequelize.STRING,
    },
    tempPassword: {
      type: sequelize.STRING,
    },
    isAdmin: {
      type: sequelize.BOOLEAN,
      defaultValue: false
    },
    isDeactivated: {
      type: sequelize.BOOLEAN,
      defaultValue: false,
    },
    isEmailVerify: {
      type: sequelize.BOOLEAN,
      defaultValue: false,
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
  }, {
    uniqueKeys: {
      Items_unique: {
        fields: ['email']
      }
    }
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('backendUser');
}

module.exports = { up, down };