const { v4: uuidv4 } = require('uuid');
// const { backendSetting_backendUserRequestEnum } = require('../../backend/setting/backendSetting_backendUserRequest.model');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingEmail', [
    {
      id: uuidv4(),
      // emailVerificationSubject: "emailVerificationSubject",
      // emailVerificationMessage: "emailVerificationMessage",
      // passwordResetSubject: "passwordResetSubject",
      // passwordResetMessage: "passwordResetMessage",
      // resetPasswordEmailSubject: "resetPasswordEmailSubject",
      // resetPasswordEmailMessage: "resetPasswordEmailMessage",
      // inviteUserSubject: "inviteUserSubject",
      // inviteUserMessage: "inviteUserMessage",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
}

module.exports = { up, down };
