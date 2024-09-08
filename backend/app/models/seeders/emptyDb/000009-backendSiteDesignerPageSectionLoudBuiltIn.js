const { v4: uuidv4 } = require('uuid');
const { LoudSectionEnum } = require('../../backend/siteDesigner/page/backendSiteDesignerPageSectionLoudBuiltIn.model');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSiteDesignerPageSectionLoudBuiltIn', [
    {
      id: "a3cf9afa-262a-4c82-b290-f35e6eafca9d",
      webAssetImport: "built-in/0/loud/homepage/GifHeader/",
      // menuJsonB: '{"menu":[{"header":"Notice","type":"CONTAINER:V1","isShowing":{"prop":"isNoticeShowing"},"data":[{"label":"Title","prop":"noticeTitle","type":"TEXTFIELD:V1","placeholder":"Important notice goes here."},{"label":"Link","prop":"noticeLink","type":"LINK_SELECTION:V1"},{"label":"Background","prop":"noticeColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(228, 228, 231)","suggestedTextColor":"DARK"}},{"label":"Background","prop":"noticeColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(39, 39, 42)","suggestedTextColor":"LIGHT"}}]},{"header":"Navigation Bar","type":"CONTAINER:V1","isShowing":{"prop":"isNavShowing"},"data":[{"label":"Background","prop":"navColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(168, 162, 158)","suggestedTextColor":"DARK"}},{"label":"Background","prop":"navColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(77, 77, 77)","suggestedTextColor":"LIGHT"}}]},{"header":"Branding","type":"CONTAINER:V1","isShowing":{"prop":"isBrandShowing"},"data":[{"label":"Show Logo","prop":"isLogoShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Logo","prop":"logo","type":"MEDIA_SELECTION:V1","fileFilter":["images"]},{"label":"Show Text","prop":"isBrandTextShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Text","prop":"brandText","type":"TEXTFIELD:V1","placeholder":"Your Brand"},{"label":"Link","prop":"brandLink","type":"LINK_SELECTION:V1"}]},{"header":"Day/Night Selector","type":"CONTAINER:V1","isShowing":{"prop":"isDayNightSelectorShowing"},"data":[{"label":"Drop Down","prop":"dayNightSelectorColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(120, 113, 108)","suggestedTextColor":"DARK"}},{"label":"Drop Down","prop":"dayNightSelectorColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(87, 83, 78)","suggestedTextColor":"LIGHT"}}]}]}',
      menuJsonB: '{"menu":[{"data":[{"prop":"backgroundColorNight","type":"COLOR_SELECTION:V1","label":"Color","isShowing":"isNightMode","defaultValue":{"color":"rgb(31, 41, 55)","suggestedTextColor":"LIGHT"}},{"prop":"backgroundColorDay","type":"COLOR_SELECTION:V1","label":"Color","isShowing":"isDayMode","defaultValue":{"color":"rgb(238, 238, 238)","suggestedTextColor":"DARK"}},{"prop":"image","type":"MEDIA_SELECTION:V1","label":"Image","fileFilter":["images"]},{"prop":"header","type":"TEXTFIELD:V1","label":"Header","placeholder":"Empower Your Business Growth"},{"prop":"description","type":"WYSIWYG:V1","label":"Description","placeholder":"Unlock success with tailored solutions and expert guidance."},{"prop":"ctaButtonColorNight","type":"COLOR_SELECTION:V1","label":"Button Color","isShowing":"isNightMode","defaultValue":{"color":"rgb(31, 41, 55)","suggestedTextColor":"LIGHT"}},{"prop":"ctaButtonColorDay","type":"COLOR_SELECTION:V1","label":"Button Color","isShowing":"isDayMode","defaultValue":{"color":"rgb(238, 238, 238)","suggestedTextColor":"DARK"}},{"prop":"ctaButtonText","type":"TEXTFIELD:V1","label":"Button Text","placeholder":"Get Started"},{"prop":"ctaButtonLink","type":"LINK_SELECTION:V1","label":"Button Link","placeholder":"/p/cool-page"}],"type":"CONTAINER:V1","header":"Basic Call-to-Action","isShowing":{"prop":"isShowing"}},{"data":[{"prop":"isImageOnRight","type":"SWITCH:V1","label":"Image on left/right side"}],"type":"CONTAINER:V1","header":"Options"}]}',
      description: `Elevate your browsing experience with our captivating animations and engaging visuals. Immerse yourself in a visual narrative that perfectly complements the wealth of knowledge we provide. Explore innovative ideas and strategies, unlocking new possibilities to propel your small business to unprecedented heights.`,
      category: LoudSectionEnum.HOMEPAGE,

      author: "built-in",
      authorLink: null,

      name: "Gif/Image Intro",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "53cbae07-d8ec-4376-a178-665f912a43c0",
      webAssetImport: "built-in/0/loud/homepage/YoutubeVideoHeader/",
      menuJsonB: '{"menu":[{"header":"Basic Call-to-Action","type":"CONTAINER:V1","isShowing":{"prop":"isShowing"},"data":[{"label":"Youtube Video ID","prop":"youtubeVideoId","type":"TEXTFIELD:V1"},{"label":"Header","prop":"header","type":"TEXTFIELD:V1","placeholder":"Empower Your Business Growth"},{"label":"Description","prop":"description","type":"WYSIWYG:V1","placeholder":"Unlock success with tailored solutions and expert guidance."}]}]}',

      description: `Enhance your journey with our captivating YouTube video, adding a dynamic touch to our narrative. Immerse yourself in a visual experience that perfectly complements the wealth of knowledge we provide. Explore innovative ideas and strategies, unlocking new possibilities to propel your small business to unprecedented heights. To get a glimpse of what awaits, simply click "Watch Video" or dive straight into our tailored solutions by clicking "Get Started."`,
      category: LoudSectionEnum.HOMEPAGE,

      author: "built-in",
      authorLink: null,

      name: "Youtube Video Intro",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a2c6cbfc-8ce9-420c-ace0-e2a2cc2da526",
      webAssetImport: "built-in/0/loud/homepage/VimeoVideoHeader/",
      menuJsonB: '{"menu":[{"header":"Basic Call-to-Action","type":"CONTAINER:V1","isShowing":{"prop":"isShowing"},"data":[{"label":"Vimeo Video ID","prop":"vimeoVideoId","type":"TEXTFIELD:V1"},{"label":"Header","prop":"header","type":"TEXTFIELD:V1","placeholder":"Empower Your Business Growth"},{"label":"Description","prop":"description","type":"WYSIWYG:V1","placeholder":"Unlock success with tailored solutions and expert guidance."}]}]}',

      description: `Enhance your browsing experience with our captivating Vimeo video that adds a dynamic touch to our narrative. Immerse yourself in a visual journey that perfectly complements the wealth of knowledge we provide. Explore innovative ideas and strategies, unlocking new possibilities to propel your small business to unprecedented heights. To get a glimpse of what awaits, simply click "Watch Video" or dive straight into our tailored solutions by clicking "Get Started."`,
      category: LoudSectionEnum.HOMEPAGE,

      author: "built-in",
      authorLink: null,

      name: "Vimeo Video Intro",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "1029c4c4-9591-4c4e-8681-ceda9be19c3b",
      webAssetImport: "built-in/0/loud/homepage/BasicCtaHeader/",
      menuJsonB: '{"menu":[{"data":[{"prop":"backgroundColorNight","type":"COLOR_SELECTION:V1","label":"Color","isShowing":"isNightMode","defaultValue":{"color":"rgb(31, 41, 55)","suggestedTextColor":"LIGHT"}},{"prop":"backgroundColorDay","type":"COLOR_SELECTION:V1","label":"Color","isShowing":"isDayMode","defaultValue":{"color":"rgb(238, 238, 238)","suggestedTextColor":"DARK"}},{"prop":"header","type":"TEXTFIELD:V1","label":"Header","placeholder":"Empower Your Business Growth"},{"prop":"description","type":"WYSIWYG:V1","label":"Description","placeholder":"Unlock success with tailored solutions and expert guidance."},{"prop":"ctaButtonColorNight","type":"COLOR_SELECTION:V1","label":"Button Color","isShowing":"isNightMode","defaultValue":{"color":"rgb(31, 41, 55)","suggestedTextColor":"LIGHT"}},{"prop":"ctaButtonColorDay","type":"COLOR_SELECTION:V1","label":"Button Color","isShowing":"isDayMode","defaultValue":{"color":"rgb(238, 238, 238)","suggestedTextColor":"DARK"}},{"prop":"ctaButtonText","type":"TEXTFIELD:V1","label":"Button Text","placeholder":"Get Started"},{"prop":"ctaButtonLink","type":"LINK_SELECTION:V1","label":"Button Link","placeholder":"/p/cool-page"}],"type":"CONTAINER:V1","header":"Basic Call-to-Action","isShowing":{"prop":"isShowing"}}]}',

      description: `Embark on a journey to empower your small business with our Main Video Header. Tailored solutions and expert guidance are here to unlock the door to success. Immerse yourself in the dynamic world of possibilities, where your business aspirations become a reality. Seize the opportunity to get started on the path to growth and prosperity.`,
      category: LoudSectionEnum.HOMEPAGE,

      author: "built-in",
      authorLink: null,

      name: "Basic Call-to-Action",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2401e702-a728-416e-9a6e-40e591d23ae3",
      webAssetImport: "built-in/0/loud/normalpage/PageHeader/",
      menuJsonB: '{"menu":[{"data":[{"prop":"header","type":"TEXTFIELD:V1","label":"Header","placeholder":"Ignite Your Journey with Innovative Solutions"},{"prop":"backgroundColorDay","type":"COLOR_SELECTION:V1","label":"Day Color","isShowing":"isDayMode","defaultValue":{"color":"rgb(238, 238, 238)","suggestedTextColor":"DARK"}},{"prop":"backgroundColorNight","type":"COLOR_SELECTION:V1","label":"Night Color","isShowing":"isNightMode","defaultValue":{"color":"#1a202c","suggestedTextColor":"LIGHT"}}],"type":"CONTAINER:V1","header":"Page Header","isShowing":{"prop":"isShowing"}}]}',

      description: `Ignite the path ahead with our page header, a beacon of innovation and solutions. Centered around excellence, this section is designed to spark your journey with a clear and compelling message. The bold typography and subtle background create an inviting space, setting the tone for an exploration of innovative solutions that await. Join us as we pave the way for your next exciting venture.`,
      category: LoudSectionEnum.NORMALPAGE,

      author: "built-in",
      authorLink: null,

      name: "Page Header",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "85f5c249-8690-4d7e-8148-0b1682962e0f",
      webAssetImport: "built-in/0/loud/normalpage/SocialMediaCover/",
      menuJsonB: '{"menu":[{"data":[{"prop":"coverImage","type":"MEDIA_SELECTION:V1","label":"Cover Image","fileFilter":["images"]},{"prop":"profileImage","type":"MEDIA_SELECTION:V1","label":"Profile Image","fileFilter":["images"]},{"prop":"header","type":"TEXTFIELD:V1","label":"Header","placeholder":"John Doe"},{"prop":"title1","type":"TEXTFIELD:V1","label":"First Title","placeholder":"Web Developer"},{"prop":"title2","type":"TEXTFIELD:V1","label":"Second Title","placeholder":"Travel Enthusiast"}],"type":"CONTAINER:V1","header":"Social Media Cover","isShowing":{"prop":"isShowing"}}]}',

      description: `Whether you're a professional or a brand, our Social Media Cover captures attention and establishes a strong online identity. Impress your audience with a combination of striking visuals and essential details, setting the stage for a meaningful and memorable online experience.`,
      category: LoudSectionEnum.NORMALPAGE,

      author: "built-in",
      authorLink: null,

      name: "Social Media Cover",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
  // await queryInterface.bulkDelete('backendSettingHeaderBuiltIn', {
  //   [Op.or]: [
  //     {
  //       webAssetImport: "built-in/0/headers/lite/",
  //     },
  //     {
  //       webAssetImport: "built-in/0/headers/small-business-few-pages/",
  //     },
  //     {
  //       webAssetImport: "built-in/0/headers/small-business-many-pages/",
  //     },
  //   ]
  // });
}

module.exports = { up, down };
