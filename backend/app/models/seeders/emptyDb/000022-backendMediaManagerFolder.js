
async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendMediaManagerFolder', [

    // ======================================
    // Media Manager Inbox Only
    //--------------------------------------
    {
      id: "34c5f602-0400-48e7-9004-dd8237956d7c",
      name: "Users",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },



  ], {})
}



async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('backendRoleManyPermission', {
    [Op.or]: [
      { id: "34c5f602-0400-48e7-9004-dd8237956d7c" },
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