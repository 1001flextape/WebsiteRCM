
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSiteDesignerDiscussionVote', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    vote: { // 1, 0, or -1
      type: sequelize.SMALLINT,
      allowNull: false,
      default: false,
    },
    discussionId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'backendSiteDesignerDiscussion',
        key: 'id',
      }
    },
    userId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'backendUser',
        key: 'id',
      }
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
  await queryInterface.dropTable('backendSiteDesignerDiscussionVote');
}

module.exports = { up, down };