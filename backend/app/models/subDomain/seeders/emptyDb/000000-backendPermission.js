const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendPermission', [
    {
      id: "2f30794d-3b68-42ed-bc02-4ac5a5cee91a",
      name: 'dashboard-read',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "f72294fb-c53e-4c6b-bcc4-c08aedd3695c",
      name: 'media-manager-inbox-only',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "e3f48381-31d3-4463-9861-5420d761c6e9",
      name: 'media-manager-read',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "c5184ea7-ec8b-4bda-abf0-29266eb40a53",
      name: 'media-manager-update',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bb7231a1-55d5-4655-8a72-2efef4e0b044",
      name: 'media-manager-delete',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cba2838f-0ad4-4853-8c90-d96de96a74a3",
      name: 'site-designer-read',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "30c4c4a8-f6cd-4233-8e30-502f9dcf0790",
      name: 'site-designer-update',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "d9e5f3b9-a5bf-4d2f-9275-288b56bf3811",
      name: 'site-designer-delete',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6242feab-3e11-4cdf-92a6-0056e3cd2e32",
      name: 'admin-read',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "290b547b-77db-4817-aff0-b3c81d77e8d8",
      name: 'admin-update',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "0d85f1d5-01dd-4c2c-9316-996af2982b82",
      name: 'admin-delete',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5970d023-e224-4e4e-830b-b3993d402616",
      name: 'user-management-read',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "438c338c-e478-40c5-8e7c-3987c88e0bcd",
      name: 'user-management-update',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3df2f2c6-ef22-4226-96d6-be464da4f71a",
      name: 'user-management-delete',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('backendPermission', {
    [Op.or]: [
      {
        id: "2f30794d-3b68-42ed-bc02-4ac5a5cee91a",
      },
      {
        id: "f72294fb-c53e-4c6b-bcc4-c08aedd3695c",
      },
      {
        id: "e3f48381-31d3-4463-9861-5420d761c6e9",
      },
      {
        id: "c5184ea7-ec8b-4bda-abf0-29266eb40a53",
      },
      {
        id: "bb7231a1-55d5-4655-8a72-2efef4e0b044",
      },
      {
        id: "cba2838f-0ad4-4853-8c90-d96de96a74a3",
      },
      {
        id: "30c4c4a8-f6cd-4233-8e30-502f9dcf0790",
      },
      {
        id: "d9e5f3b9-a5bf-4d2f-9275-288b56bf3811",
      },
      {
        id: "6242feab-3e11-4cdf-92a6-0056e3cd2e32",
      },
      {
        id: "290b547b-77db-4817-aff0-b3c81d77e8d8",
      },
      {
        id: "0d85f1d5-01dd-4c2c-9316-996af2982b82",
      },
      {
        id: "5970d023-e224-4e4e-830b-b3993d402616",
      },
      {
        id: "438c338c-e478-40c5-8e7c-3987c88e0bcd",
      },
      {
        id: "3df2f2c6-ef22-4226-96d6-be464da4f71a",
      },
    ]
  });
}

module.exports = { up, down };


// export default {
//   up: async (queryInterface) => queryInterface.bulkInsert('backendPermission', [
//     {
//       name: 'backend-siteDesigner-read',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       name: 'backend-siteDesigner-update',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       name: 'backend-siteDesigner-setting',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//   ], {}),
//   down: async (queryInterface) => {
//     await queryInterface.bulkDelete('Currencies', {
//       [Op.or]: [
//         {
//           name: 'backend-siteDesigner-read'
//         }, 
//         {
//           name: 'backend-siteDesigner-update'
//         },
//         {
//           name: 'backend-siteDesigner-update'
//         },
//       ]
//     });
//   }
// };


// const { Sequelize } = require('sequelize');

// async function up({ context: queryInterface }) {
//   await queryInterface.createTable('backendPermission', {
//     id: {
//       type: Sequelize.UUID,
//       defaultValue: Sequelize.UUIDV4,
//       primaryKey: true,
//     },
//     name: {
//       type: Sequelize.STRING
//     },
//     createdAt: {
//       allowNull: false,
//       type: Sequelize.DATE
//     },
//     updatedAt: {
//       allowNull: false,
//       type: Sequelize.DATE
//     },
//     deletedAt: {
//       allowNull: true,
//       type: Sequelize.DATE
//     },
//   });
// }

// async function down({ context: queryInterface }) {
//   await queryInterface.dropTable('backendPermissions');
// }

// module.exports = { up, down };