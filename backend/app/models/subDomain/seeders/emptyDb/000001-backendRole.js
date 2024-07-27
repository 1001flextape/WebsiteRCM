const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendRole', [
    {
      id: "3da19e9e-06c1-4b26-acfc-bb727337fb0a",
      name: 'Media Manager Inbox Only',
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "26249eec-d26a-437d-869e-54f1e4c34ad8",
      name: 'Observer',
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "14307d09-28cb-443d-bbd5-0948a913d729",
      name: 'Content Creator',
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
      name: 'Editor',
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('backendRole', {
    [Op.or]: [
      {
        id: "3da19e9e-06c1-4b26-acfc-bb727337fb0a",
      },
      {
        id: "26249eec-d26a-437d-869e-54f1e4c34ad8",
      },
      {
        id: "14307d09-28cb-443d-bbd5-0948a913d729",
      },
      {
        id: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
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