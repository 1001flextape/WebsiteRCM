
async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendRoleManyPermission', [

    // ======================================
    // Media Manager Inbox Only
    //--------------------------------------
    {
      id: "b58ffbe7-b91e-4eac-872d-985385506a31",
      roleId: "3da19e9e-06c1-4b26-acfc-bb727337fb0a",
      permissionId: "f72294fb-c53e-4c6b-bcc4-c08aedd3695c",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // ======================================
    // Observer
    //--------------------------------------
    {
      id: "2530bcb9-4a5b-4f9a-99a3-88d4e1f512c1",
      roleId: "26249eec-d26a-437d-869e-54f1e4c34ad8",
      permissionId: "2f30794d-3b68-42ed-bc02-4ac5a5cee91a",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2a36973e-5c6f-4cd1-9a80-1fcfd5d54c0e",
      roleId: "26249eec-d26a-437d-869e-54f1e4c34ad8",
      permissionId: "e3f48381-31d3-4463-9861-5420d761c6e9",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a1b9dfbc-ed13-4351-8b21-090d053d920d",
      roleId: "26249eec-d26a-437d-869e-54f1e4c34ad8",
      permissionId: "cba2838f-0ad4-4853-8c90-d96de96a74a3",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },


    // ======================================
    // Content Creator
    //--------------------------------------
    {
      id: "e25c976e-8281-4fb8-b1ea-b972ab4e1f81",
      roleId: "14307d09-28cb-443d-bbd5-0948a913d729",
      permissionId: "2f30794d-3b68-42ed-bc02-4ac5a5cee91a",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5961bbaa-ab94-458d-b303-22e0f087cc23",
      roleId: "14307d09-28cb-443d-bbd5-0948a913d729",
      permissionId: "e3f48381-31d3-4463-9861-5420d761c6e9",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "950bda1f-8162-4ef8-8bd1-7072ea1de15f",
      roleId: "14307d09-28cb-443d-bbd5-0948a913d729",
      permissionId: "c5184ea7-ec8b-4bda-abf0-29266eb40a53",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "51a7fd63-05fd-417e-a672-3da46f955c26",
      roleId: "14307d09-28cb-443d-bbd5-0948a913d729",
      permissionId: "bb7231a1-55d5-4655-8a72-2efef4e0b044",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4487e456-cbc3-43ac-a8cd-91080692d7ad",
      roleId: "14307d09-28cb-443d-bbd5-0948a913d729",
      permissionId: "cba2838f-0ad4-4853-8c90-d96de96a74a3",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6d343566-d724-474a-a9c3-acc5033295fe",
      roleId: "14307d09-28cb-443d-bbd5-0948a913d729",
      permissionId: "30c4c4a8-f6cd-4233-8e30-502f9dcf0790",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "b18ee8ab-2034-4806-93c8-c291aafab219",
      roleId: "14307d09-28cb-443d-bbd5-0948a913d729",
      permissionId: "d9e5f3b9-a5bf-4d2f-9275-288b56bf3811",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },



    // ======================================
    // Editor
    //--------------------------------------
    {
      id: "4049d013-85c6-4e6e-9e2b-ad3c20410aa2",
      roleId: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
      permissionId: "2f30794d-3b68-42ed-bc02-4ac5a5cee91a",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "8b06ab34-17e1-4985-858a-34cef0f95bbb",
      roleId: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
      permissionId: "e3f48381-31d3-4463-9861-5420d761c6e9",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "53db06a0-9975-4c46-812e-ba7478fd5393",
      roleId: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
      permissionId: "c5184ea7-ec8b-4bda-abf0-29266eb40a53",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "63d93f5d-6e70-4765-9352-7d28662517db",
      roleId: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
      permissionId: "bb7231a1-55d5-4655-8a72-2efef4e0b044",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a981b202-a63d-46ca-8989-49a09f815a98",
      roleId: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
      permissionId: "cba2838f-0ad4-4853-8c90-d96de96a74a3",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "60dda361-32f7-4d0d-8d8d-297fb8cf0d7a",
      roleId: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
      permissionId: "30c4c4a8-f6cd-4233-8e30-502f9dcf0790",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "b0dd4290-a914-40bd-92f7-4cf7bb82fedf",
      roleId: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
      permissionId: "d9e5f3b9-a5bf-4d2f-9275-288b56bf3811",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "d096dd0e-9350-4a9f-8625-4f17d9a61636",
      roleId: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
      permissionId: "6242feab-3e11-4cdf-92a6-0056e3cd2e32",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "7b7861d4-436b-4d99-813b-8fca5f068192",
      roleId: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
      permissionId: "290b547b-77db-4817-aff0-b3c81d77e8d8",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "0bb342e3-10bc-48ac-ba5a-ee8dd67c45cc",
      roleId: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
      permissionId: "0d85f1d5-01dd-4c2c-9316-996af2982b82",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },













    // ======================================
    // Custom Permissions
    //--------------------------------------

    // No defaults permissions for role


  ], {})
}



async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('backendRoleManyPermission', {
    [Op.or]: [
      { id: "b58ffbe7-b91e-4eac-872d-985385506a31" },
      { id: "2530bcb9-4a5b-4f9a-99a3-88d4e1f512c1" },
      { id: "2a36973e-5c6f-4cd1-9a80-1fcfd5d54c0e" },
      { id: "a1b9dfbc-ed13-4351-8b21-090d053d920d" },
      { id: "e25c976e-8281-4fb8-b1ea-b972ab4e1f81" },
      { id: "5961bbaa-ab94-458d-b303-22e0f087cc23" },
      { id: "950bda1f-8162-4ef8-8bd1-7072ea1de15f" },
      { id: "51a7fd63-05fd-417e-a672-3da46f955c26" },
      { id: "4487e456-cbc3-43ac-a8cd-91080692d7ad" },
      { id: "6d343566-d724-474a-a9c3-acc5033295fe" },
      { id: "b18ee8ab-2034-4806-93c8-c291aafab219" },
      { id: "4049d013-85c6-4e6e-9e2b-ad3c20410aa2" },
      { id: "8b06ab34-17e1-4985-858a-34cef0f95bbb" },
      { id: "53db06a0-9975-4c46-812e-ba7478fd5393" },
      { id: "63d93f5d-6e70-4765-9352-7d28662517db" },
      { id: "a981b202-a63d-46ca-8989-49a09f815a98" },
      { id: "60dda361-32f7-4d0d-8d8d-297fb8cf0d7a" },
      { id: "b0dd4290-a914-40bd-92f7-4cf7bb82fedf" },
      { id: "d096dd0e-9350-4a9f-8625-4f17d9a61636" },
      { id: "7b7861d4-436b-4d99-813b-8fca5f068192" },
      { id: "0bb342e3-10bc-48ac-ba5a-ee8dd67c45cc" },
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