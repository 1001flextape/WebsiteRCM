const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingHeader', [
    {
      id: uuidv4(),
      webAssetImport: "built-in/0/headers/LiteHeader/",
      menuJsonB: '{"menu":[{"data":[{"prop":"noticeTitle","type":"TEXTFIELD:V1","label":"Title","placeholder":"Important notice goes here."},{"prop":"noticeLink","type":"LINK_SELECTION:V1","label":"Link"},{"prop":"noticeColorDay","type":"COLOR_SELECTION:V1","label":"Background","isShowing":"isDayMode","defaultValue":{"color":"rgb(228, 228, 231)","suggestedTextColor":"DARK"}},{"prop":"noticeColorNight","type":"COLOR_SELECTION:V1","label":"Background","isShowing":"isNightMode","defaultValue":{"color":"rgb(39, 39, 42)","suggestedTextColor":"LIGHT"}}],"type":"CONTAINER:V1","header":"Notice","isShowing":{"prop":"isNoticeShowing"}},{"data":[{"prop":"navColorDay","type":"COLOR_SELECTION:V1","label":"Background","isShowing":"isDayMode","defaultValue":{"color":"rgb(168, 162, 158)","suggestedTextColor":"DARK"}},{"prop":"navColorNight","type":"COLOR_SELECTION:V1","label":"Background","isShowing":"isNightMode","defaultValue":{"color":"rgb(77, 77, 77)","suggestedTextColor":"LIGHT"}}],"type":"CONTAINER:V1","header":"Navigation Bar","isShowing":{"prop":"isNavShowing"}},{"data":[{"prop":"isLogoShowing","type":"SWITCH:V1","label":"Show Logo","defaultValue":true},{"prop":"logo","type":"MEDIA_SELECTION:V1","label":"Logo","fileFilter":["images"]},{"prop":"isBrandTextShowing","type":"SWITCH:V1","label":"Show Text","defaultValue":true},{"prop":"brandText","type":"TEXTFIELD:V1","label":"Text","placeholder":"Your Brand"},{"prop":"brandLink","type":"LINK_SELECTION:V1","label":"Link"}],"type":"CONTAINER:V1","header":"Branding","isShowing":{"prop":"isBrandShowing"}}]}',
      userAnswersJsonB: JSON.stringify({}),

      selectionType: "BUILT_IN",
      selectionId: "2ec57f1a-f355-48d5-8aa3-a8fc2e457ff4",
      isReady: false,
      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {})
}

async function down({ context: queryInterface }) {
  // Not Implemented
  // User is primary user of this record, loading init data.
}

module.exports = { up, down };
