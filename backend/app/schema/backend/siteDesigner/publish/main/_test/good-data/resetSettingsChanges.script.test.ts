import { v4 as uuidv4 } from "uuid";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { SelectionTypeEnum } from "../../../../../../../models/backend/setting/backendSettingHeader.model";
import makeBackendSiteDesignerPublishMain from "../../backendSiteDesignerPublish.main";
import makeBackendSettingSiteMain from "../../../../../setting/site/main/backendSettingSite.main";
import makeBackendSettingColorsMain from "../../../../../setting/colors/main/backendSettingColors.main";
import makeBackendSettingFooterMain from "../../../../../setting/footer/main/backendSettingFooter.main";
import makeBackendSettingHeaderMain from "../../../../../setting/header/main/backendSettingHeader.main";
import makeBackendSettingLinkMain from "../../../../../setting/links/main/backendSettingLink.main";
import makeBackendSettingOrganizationMain from "../../../../../setting/organization/main/backendSettingOrganization.main";
import makeBackendSettingBackgroundColorMain from "../../../../../setting/backgroundColor/main/backendSettingBackgroundColor.main";
import makeBackendSettingFontMain from "../../../../../setting/font/main/backendSettingFont.main";
import makeBackendSettingColumnMain from "../../../../../setting/column/main/backendSettingColumn.main";
jest.setTimeout(100000)

describe("test backendSiteDesignerPublish.main.js", () => {
  let d: dependencies

  //uuids
  let backendSiteDesignerPageUuid: string;

  beforeAll(async () => {

    d = await makeDTestObj()



    //import
    const backendSettingBrowser = makeBackendSettingSiteMain(d)
    const backendSettingColors = makeBackendSettingColorsMain(d)
    const backendSettingFooter = makeBackendSettingFooterMain(d)
    const backendSettingLink = makeBackendSettingLinkMain(d)
    const backendSettingHeader = makeBackendSettingHeaderMain(d)
    const backendSettingOrganization = makeBackendSettingOrganizationMain(d)

    const backendSettingBackgroundColor = makeBackendSettingBackgroundColorMain(d)
    const backendSettingFont = makeBackendSettingFontMain(d)
    const backendSettingColumn = makeBackendSettingColumnMain(d)


    // updates
    await backendSettingBrowser.upsertOne({
      isReady: true,
      isChanged: true,
      tab: "tab"
    })
    await backendSettingColors.upsertOne({
      isReady: true,
      isChanged: true,
      color1: "color1",
      color1Dark1: "color1Dark1",
      color1Dark2: "color1Dark2",
      color1Dark3: "color1Dark3",
      color1Dark4: "color1Dark4",
      color1Light1: "color1Light1",
      color1Light2: "color1Light2",
      color1Light3: "color1Light3",
      color1Light4: "color1Light4",
      color2: "color2",
      color2Dark1: "color2Dark1",
      color2Dark2: "color2Dark2",
      color2Dark3: "color2Dark3",
      color2Dark4: "color2Dark4",
      color2Light1: "color2Light1",
      color2Light2: "color2Light2",
      color2Light3: "color2Light3",
      color2Light4: "color2Light4",
      color3: "color3",
      color3Dark1: "color3Dark1",
      color3Dark2: "color3Dark2",
      color3Dark3: "color3Dark3",
      color3Dark4: "color3Dark4",
      color3Light1: "color3Light1",
      color3Light2: "color3Light2",
      color3Light3: "color3Light3",
      color3Light4: "color3Light4",
      color4: "color4",
      color4Dark1: "color4Dark1",
      color4Dark2: "color4Dark2",
      color4Dark3: "color4Dark3",
      color4Dark4: "color4Dark4",
      color4Light1: "color4Light1",
      color4Light2: "color4Light2",
      color4Light3: "color4Light3",
      color4Light4: "color4Light4",
      color5: "color5",
      color5Dark1: "color5Dark1",
      color5Dark2: "color5Dark2",
      color5Dark3: "color5Dark3",
      color5Dark4: "color5Dark4",
      color5Light1: "color5Light1",
      color5Light2: "color5Light2",
      color5Light3: "color5Light3",
      color5Light4: "color5Light4",
      color6: "color6",
      color6Dark1: "color6Dark1",
      color6Dark2: "color6Dark2",
      color6Dark3: "color6Dark3",
      color6Dark4: "color6Dark4",
      color6Light1: "color6Light1",
      color6Light2: "color6Light2",
      color6Light3: "color6Light3",
      color6Light4: "color6Light4",
      color7: "color7",
      color7Dark1: "color7Dark1",
      color7Dark2: "color7Dark2",
      color7Dark3: "color7Dark3",
      color7Dark4: "color7Dark4",
      color7Light1: "color7Light1",
      color7Light2: "color7Light2",
      color7Light3: "color7Light3",
      color7Light4: "color7Light4",
      color8: "color8",
      color8Dark1: "color8Dark1",
      color8Dark2: "color8Dark2",
      color8Dark3: "color8Dark3",
      color8Dark4: "color8Dark4",
      color8Light1: "color8Light1",
      color8Light2: "color8Light2",
      color8Light3: "color8Light3",
      color8Light4: "color8Light4",
      color9: "color9",
      color9Dark1: "color9Dark1",
      color9Dark2: "color9Dark2",
      color9Dark3: "color9Dark3",
      color9Dark4: "color9Dark4",
      color9Light1: "color9Light1",
      color9Light2: "color9Light2",
      color9Light3: "color9Light3",
      color9Light4: "color9Light4",

    })
    await backendSettingFooter.upsertOne({
      isReady: true,
      isChanged: true,
      userAnswers: "{}",
      selectionId: "5ce91223-9685-4ee7-93c2-6e38bae8804f",
      selectionType: SelectionTypeEnum.BUILT_IN,
    })
    await backendSettingHeader.upsertOne({
      isReady: true,
      isChanged: true,
      userAnswers: "{}",
      selectionId: "2ec57f1a-f355-48d5-8aa3-a8fc2e457ff4",
      selectionType: SelectionTypeEnum.BUILT_IN,
    })

    await backendSettingLink.upsertOne({
      isReady: true,
      isChanged: true,
      description: "description",
      title: "title",
    })
    await backendSettingOrganization.upsertOne({
      isChanged: true,
      shouldApplyToTopNavMenu: false,
      name: "name",

      addressLine1: "addressLine1",
      addressLine2: "addressLine2",
      cityLocality: "cityLocality",
      stateProvinceRegion: "stateProvinceRegion",
      postalCode: "postalCode",

      socialFacebook: "socialFacebook",
      socialInstagram: "socialInstagram",
      socialLinkedIn: "socialLinkedIn",
      socialPinterest: "socialPinterest",
      socialReddit: "socialReddit",
      socialWhatsapp: "socialWhatsapp",
      socialX: "socialX",
      socialYouTube: "socialYouTube",
    })

    await backendSettingBackgroundColor.upsertOne({
      backgroundColor_day: "backgroundColor_day",
      backgroundColor_night: "backgroundColor_night",
    })

    await backendSettingColumn.upsertOne({
      width: "width",
    })

    await backendSettingFont.upsertOne({
      font: "font",
    })


  }, 100000)

  test("publishSite: can publish site.", async () => {
    // main import
    const publish = makeBackendSiteDesignerPublishMain(d)
    //import
    const backendSettingBrowser = makeBackendSettingSiteMain(d)
    const backendSettingColors = makeBackendSettingColorsMain(d)
    const backendSettingFooter = makeBackendSettingFooterMain(d)
    const backendSettingLink = makeBackendSettingLinkMain(d)
    const backendSettingHeader = makeBackendSettingHeaderMain(d)
    const backendSettingOrganization = makeBackendSettingOrganizationMain(d)

    const backendSettingBackgroundColor = makeBackendSettingBackgroundColorMain(d)
    const backendSettingFont = makeBackendSettingFontMain(d)
    const backendSettingColumn = makeBackendSettingColumnMain(d)



    // target action being completed.
    // client site namespace gets a data mapping from backend settings/page
    await publish.publishSite()

    // check resources

    /////////////////////////////////////
    // browser
    // =================================

    const browser = await backendSettingBrowser.getOne()
    expect(browser.data.dataValues.isChanged).toBe(false)

    /////////////////////////////////////
    // colors
    // =================================

    const colors = await backendSettingColors.getOne()
    expect(colors.data.dataValues.isChanged).toBe(false)

    /////////////////////////////////////
    // footer
    // =================================

    const footer = await backendSettingFooter.getOne()
    expect(footer.data.dataValues.isChanged).toBe(false)

    /////////////////////////////////////
    // header
    // =================================

    const header = await backendSettingHeader.getOne()
    expect(header.data.dataValues.isChanged).toBe(false)

    /////////////////////////////////////
    // link
    // =================================

    const link = await backendSettingLink.getOne()
    expect(link.data.dataValues.isChanged).toBe(false)

    /////////////////////////////////////
    // organization
    // =================================

    const organization = await backendSettingOrganization.getOne()
    expect(organization.data.dataValues.isChanged).toBe(false)

    /////////////////////////////////////
    // Background Color
    // =================================

    const backgroundColor = await backendSettingBackgroundColor.getOne()
    expect(backgroundColor.data.dataValues.isChanged).toBe(false)

    /////////////////////////////////////
    // Column
    // =================================

    const column = await backendSettingColumn.getOne()
    expect(column.data.dataValues.isChanged).toBe(false)

    /////////////////////////////////////
    // Font
    // =================================

    const font = await backendSettingFont.getOne()
    expect(font.data.dataValues.isChanged).toBe(false)


  })

  afterAll(async () => {

    await d.dbTransaction.rollback()
  })
})

