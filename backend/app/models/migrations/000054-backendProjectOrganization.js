
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendProjectOrganization', {
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
    
    logo: {
      type: sequelize.STRING,
      // type: sequelize.ENUM("ANYONE", "REQUEST_NO_PASSWORD", "REQUEST", "MANUAL"),
    },
    name: {
      type: sequelize.STRING,
    },
    shouldApplyToTopNavMenu: {
      type: sequelize.BOOLEAN,
    },
    addressLine1: {
      type: sequelize.STRING,
    },
    addressLine2: {
      type: sequelize.STRING,
    },
    cityLocality: {
      type: sequelize.STRING,
    },
    stateProvinceRegion: {
      type: sequelize.STRING,
    },
    postalCode: {
      type: sequelize.STRING,
    },
    socialFacebook: {
      type: sequelize.STRING,
    },
    socialX: {
      type: sequelize.STRING,
    },
    socialInstagram: {
      type: sequelize.STRING,
    },
    socialLinkedIn: {
      type: sequelize.STRING,
    },
    socialYouTube: {
      type: sequelize.STRING,
    },
    socialPinterest: {
      type: sequelize.STRING,
    },
    socialWhatsapp: {
      type: sequelize.STRING,
    },
    socialReddit: {
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
  await queryInterface.dropTable('backendProjectOrganization');
}

module.exports = { up, down };