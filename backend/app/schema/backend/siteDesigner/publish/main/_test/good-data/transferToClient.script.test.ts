import { v4 as uuidv4 } from "uuid";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import makeBackendSiteDesignerPublishMain from "../../backendSiteDesignerPublish.main";
import makeClientSiteColorsMain from "../../../../../../client/site/main/clientSiteColors.main";
import makeClientSiteBrowserMain from "../../../../../../client/site/main/clientSiteBrowser.main";
import makeClientSiteFooterMain from "../../../../../../client/site/main/clientSiteFooter.main";
import makeClientSiteHeaderMain from "../../../../../../client/site/main/clientSiteHeader.main";
import makeClientSiteLinkMain from "../../../../../../client/site/main/clientSiteLink.main";
import makeClientSiteOrganizationMain from "../../../../../../client/site/main/clientSiteOrganization.main";
import makeClientSitePageMain from "../../../../../../client/site/main/clientSitePage.main";
import makeClientSitePageBrowserMain from "../../../../../../client/site/main/clientSitePageBrowser.main";
import makeClientSitePageLinkMain from "../../../../../../client/site/main/clientSitePageLink.main";
import makeClientSitePageSectionLoudMain from "../../../../../../client/site/main/clientSitePageSectionLoud.main";
import makeClientSitePageSectionNormalMain from "../../../../../../client/site/main/clientSitePageSectionNormal.main";
import makeBackendSettingSiteMain from "../../../../../setting/site/main/backendSettingSite.main";
import makeBackendSettingColorsMain from "../../../../../setting/colors/main/backendSettingColors.main";
import makeBackendSettingFooterMain from "../../../../../setting/footer/main/backendSettingFooter.main";
import makeBackendSettingHeaderMain from "../../../../../setting/header/main/backendSettingHeader.main";
import makeBackendSettingLinkMain from "../../../../../setting/links/main/backendSettingLink.main";
import makeBackendSettingOrganizationMain from "../../../../../setting/organization/main/backendSettingOrganization.main";
import makeBackendSiteDesignerPageMain from "../../../../page/main/backendSiteDesignerPage.main";
import makeBackendSiteDesignerPageBrowserMain from "../../../../page/main/backendSiteDesignerPageBrowser.main";
import makeBackendSiteDesignerPageLinkMain from "../../../../page/main/backendSiteDesignerPageLink.main";
import makeBackendSiteDesignerPageSectionLoudMain from "../../../../page/main/backendSiteDesignerPageSectionLoud.main";
import makeBackendSiteDesignerPageSectionNormalMain from "../../../../page/main/backendSiteDesignerPageSectionNormal.main";
import { SelectionTypeEnum } from "../../../../../../../models/backend/setting/backendSettingHeader.model";
import makeBackendSettingBackgroundColorMain from "../../../../../setting/backgroundColor/main/backendSettingBackgroundColor.main";
import makeBackendSettingFontMain from "../../../../../setting/font/main/backendSettingFont.main";
import makeBackendSettingColumnMain from "../../../../../setting/column/main/backendSettingColumn.main";
import makeClientSiteBackgroundColorMain from "../../../../../../client/site/main/clientSiteBackgroundColor.main";
import makeClientSiteColumnMain from "../../../../../../client/site/main/clientSiteColumn.main";
import makeClientSiteFontMain from "../../../../../../client/site/main/clientSiteFont.main";
jest.setTimeout(100000)

describe("test transferToClient.main.js", () => {
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

    const backendSiteDesignerPage = makeBackendSiteDesignerPageMain(d)
    const backendSiteDesignerPageBrowser = makeBackendSiteDesignerPageBrowserMain(d)
    const backendSiteDesignerPageLink = makeBackendSiteDesignerPageLinkMain(d)
    const backendSiteDesignerPageSectionLoud = makeBackendSiteDesignerPageSectionLoudMain(d)
    const backendSiteDesignerPageSectionNormal = makeBackendSiteDesignerPageSectionNormalMain(d)

    // updates
    await backendSettingBrowser.upsertOne({
      isReady: true,
      tab: "tab"
    })
    await backendSettingColors.upsertOne({
      isReady: true,
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
      userAnswers: "{}",
      selectionId: "5ce91223-9685-4ee7-93c2-6e38bae8804f",
      selectionType: SelectionTypeEnum.BUILT_IN,
    })
    await backendSettingHeader.upsertOne({
      isReady: true,
      userAnswers: "{}",
      selectionId: "2ec57f1a-f355-48d5-8aa3-a8fc2e457ff4",
      selectionType: SelectionTypeEnum.BUILT_IN,
    })

    await backendSettingLink.upsertOne({
      isReady: true,
      description: "description",
      title: "title",
    })
    await backendSettingOrganization.upsertOne({
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

    //pages
    const page = await backendSiteDesignerPage.addOne({
      isReady: true,
      slug: "/slug/publish-test/should-not-be-saved"
    })
    backendSiteDesignerPageUuid = page.data.dataValues.id;
    await backendSiteDesignerPageBrowser.upsertOne({
      pageId: backendSiteDesignerPageUuid,
      tabName: "tabName",
    })
    await backendSiteDesignerPageLink.upsertOne({
      pageId: backendSiteDesignerPageUuid,
      description: "description",
      pictureAlt: "pictureAlt",
      title: "title",
    })
    await backendSiteDesignerPageSectionLoud.upsertOne({
      pageId: backendSiteDesignerPageUuid,
      isReady: true,
      userAnswersJsonB: "{}",
      author: "author",
      name: "name",
      selectionId: "a3cf9afa-262a-4c82-b290-f35e6eafca9d",
      selectionType: SelectionTypeEnum.BUILT_IN,
    })
    await backendSiteDesignerPageSectionNormal.addOne({
      pageId: backendSiteDesignerPageUuid,
      isReady: true,
      orderNumber: 0,
      userAnswersJsonB: "{}",
      author: "author",
      name: "name",
      selectionId: "f3c9ba04-9e0e-49ac-967e-e001eaecc1e6",
      selectionType: SelectionTypeEnum.BUILT_IN,
    })


  }, 100000)

  test("publishSite: can publish site.", async () => {
    // main import
    const publish = makeBackendSiteDesignerPublishMain(d)
    // imports
    const clientSiteBrowser = makeClientSiteBrowserMain(d)
    const clientSiteColors = makeClientSiteColorsMain(d)
    const clientSiteFooter = makeClientSiteFooterMain(d)
    const clientSiteHeader = makeClientSiteHeaderMain(d)
    const clientSiteLink = makeClientSiteLinkMain(d)
    const clientSiteOrganization = makeClientSiteOrganizationMain(d)
    const clientSiteBackgroundColor = makeClientSiteBackgroundColorMain(d)
    const clientSiteColumn = makeClientSiteColumnMain(d)
    const clientSiteFont = makeClientSiteFontMain(d)


    const clientSitePage = makeClientSitePageMain(d)
    const clientSitePageBrowser = makeClientSitePageBrowserMain(d)
    const clientSitePageLink = makeClientSitePageLinkMain(d)
    const clientSitePageSectionLoud = makeClientSitePageSectionLoudMain(d)
    const clientSitePageSectionNormal = makeClientSitePageSectionNormalMain(d)



    // target action being completed.
    // client site namespace gets a data mapping from backend settings/page
    await publish.publishSite()

    // check resources

    /////////////////////////////////////
    // browser
    // =================================

    const browser = await clientSiteBrowser.getOne()
    expect(browser.data.dataValues.tab).toEqual("tab")





    /////////////////////////////////////
    // colors
    // =================================

    const colors = await clientSiteColors.getOne()
    expect(colors.data.dataValues.color1).toEqual("color1")
    expect(colors.data.dataValues.color1Dark1).toEqual("color1Dark1")
    expect(colors.data.dataValues.color1Dark2).toEqual("color1Dark2")
    expect(colors.data.dataValues.color1Dark3).toEqual("color1Dark3")
    expect(colors.data.dataValues.color1Dark4).toEqual("color1Dark4")
    expect(colors.data.dataValues.color1Light1).toEqual("color1Light1")
    expect(colors.data.dataValues.color1Light2).toEqual("color1Light2")
    expect(colors.data.dataValues.color1Light3).toEqual("color1Light3")
    expect(colors.data.dataValues.color1Light4).toEqual("color1Light4")
    expect(colors.data.dataValues.color2).toEqual("color2")
    expect(colors.data.dataValues.color2Dark1).toEqual("color2Dark1")
    expect(colors.data.dataValues.color2Dark2).toEqual("color2Dark2")
    expect(colors.data.dataValues.color2Dark3).toEqual("color2Dark3")
    expect(colors.data.dataValues.color2Dark4).toEqual("color2Dark4")
    expect(colors.data.dataValues.color2Light1).toEqual("color2Light1")
    expect(colors.data.dataValues.color2Light2).toEqual("color2Light2")
    expect(colors.data.dataValues.color2Light3).toEqual("color2Light3")
    expect(colors.data.dataValues.color2Light4).toEqual("color2Light4")
    expect(colors.data.dataValues.color3).toEqual("color3")
    expect(colors.data.dataValues.color3Dark1).toEqual("color3Dark1")
    expect(colors.data.dataValues.color3Dark2).toEqual("color3Dark2")
    expect(colors.data.dataValues.color3Dark3).toEqual("color3Dark3")
    expect(colors.data.dataValues.color3Dark4).toEqual("color3Dark4")
    expect(colors.data.dataValues.color3Light1).toEqual("color3Light1")
    expect(colors.data.dataValues.color3Light2).toEqual("color3Light2")
    expect(colors.data.dataValues.color3Light3).toEqual("color3Light3")
    expect(colors.data.dataValues.color3Light4).toEqual("color3Light4")
    expect(colors.data.dataValues.color4).toEqual("color4")
    expect(colors.data.dataValues.color4Dark1).toEqual("color4Dark1")
    expect(colors.data.dataValues.color4Dark2).toEqual("color4Dark2")
    expect(colors.data.dataValues.color4Dark3).toEqual("color4Dark3")
    expect(colors.data.dataValues.color4Dark4).toEqual("color4Dark4")
    expect(colors.data.dataValues.color4Light1).toEqual("color4Light1")
    expect(colors.data.dataValues.color4Light2).toEqual("color4Light2")
    expect(colors.data.dataValues.color4Light3).toEqual("color4Light3")
    expect(colors.data.dataValues.color4Light4).toEqual("color4Light4")
    expect(colors.data.dataValues.color5).toEqual("color5")
    expect(colors.data.dataValues.color5Dark1).toEqual("color5Dark1")
    expect(colors.data.dataValues.color5Dark2).toEqual("color5Dark2")
    expect(colors.data.dataValues.color5Dark3).toEqual("color5Dark3")
    expect(colors.data.dataValues.color5Dark4).toEqual("color5Dark4")
    expect(colors.data.dataValues.color5Light1).toEqual("color5Light1")
    expect(colors.data.dataValues.color5Light2).toEqual("color5Light2")
    expect(colors.data.dataValues.color5Light3).toEqual("color5Light3")
    expect(colors.data.dataValues.color5Light4).toEqual("color5Light4")
    expect(colors.data.dataValues.color6).toEqual("color6")
    expect(colors.data.dataValues.color6Dark1).toEqual("color6Dark1")
    expect(colors.data.dataValues.color6Dark2).toEqual("color6Dark2")
    expect(colors.data.dataValues.color6Dark3).toEqual("color6Dark3")
    expect(colors.data.dataValues.color6Dark4).toEqual("color6Dark4")
    expect(colors.data.dataValues.color6Light1).toEqual("color6Light1")
    expect(colors.data.dataValues.color6Light2).toEqual("color6Light2")
    expect(colors.data.dataValues.color6Light3).toEqual("color6Light3")
    expect(colors.data.dataValues.color6Light4).toEqual("color6Light4")
    expect(colors.data.dataValues.color7).toEqual("color7")
    expect(colors.data.dataValues.color7Dark1).toEqual("color7Dark1")
    expect(colors.data.dataValues.color7Dark2).toEqual("color7Dark2")
    expect(colors.data.dataValues.color7Dark3).toEqual("color7Dark3")
    expect(colors.data.dataValues.color7Dark4).toEqual("color7Dark4")
    expect(colors.data.dataValues.color7Light1).toEqual("color7Light1")
    expect(colors.data.dataValues.color7Light2).toEqual("color7Light2")
    expect(colors.data.dataValues.color7Light3).toEqual("color7Light3")
    expect(colors.data.dataValues.color7Light4).toEqual("color7Light4")
    expect(colors.data.dataValues.color8).toEqual("color8")
    expect(colors.data.dataValues.color8Dark1).toEqual("color8Dark1")
    expect(colors.data.dataValues.color8Dark2).toEqual("color8Dark2")
    expect(colors.data.dataValues.color8Dark3).toEqual("color8Dark3")
    expect(colors.data.dataValues.color8Dark4).toEqual("color8Dark4")
    expect(colors.data.dataValues.color8Light1).toEqual("color8Light1")
    expect(colors.data.dataValues.color8Light2).toEqual("color8Light2")
    expect(colors.data.dataValues.color8Light3).toEqual("color8Light3")
    expect(colors.data.dataValues.color8Light4).toEqual("color8Light4")
    expect(colors.data.dataValues.color9).toEqual("color9")
    expect(colors.data.dataValues.color9Dark1).toEqual("color9Dark1")
    expect(colors.data.dataValues.color9Dark2).toEqual("color9Dark2")
    expect(colors.data.dataValues.color9Dark3).toEqual("color9Dark3")
    expect(colors.data.dataValues.color9Dark4).toEqual("color9Dark4")
    expect(colors.data.dataValues.color9Light1).toEqual("color9Light1")
    expect(colors.data.dataValues.color9Light2).toEqual("color9Light2")
    expect(colors.data.dataValues.color9Light3).toEqual("color9Light3")
    expect(colors.data.dataValues.color9Light4).toEqual("color9Light4")





    /////////////////////////////////////
    // footer
    // =================================

    const footer = await clientSiteFooter.getOne()
    expect(footer.data.dataValues.userAnswersJsonB).toEqual("{}")
    expect(footer.data.dataValues.webAssetImport).toEqual("built-in/0/footers/LiteFooter/")




    /////////////////////////////////////
    // header
    // =================================

    const header = await clientSiteHeader.getOne()
    expect(header.data.dataValues.userAnswersJsonB).toEqual("{}")
    expect(header.data.dataValues.webAssetImport).toEqual("built-in/0/headers/LiteHeader/")




    /////////////////////////////////////
    // link
    // =================================

    const link = await clientSiteLink.getOne()
    expect(link.data.dataValues.description).toEqual("description")
    expect(link.data.dataValues.title).toEqual("title")




    /////////////////////////////////////
    // organization
    // =================================

    const organization = await clientSiteOrganization.getOne()
    expect(organization.data.dataValues.name).toEqual("name")
    expect(organization.data.dataValues.addressLine1).toEqual("addressLine1")
    expect(organization.data.dataValues.addressLine2).toEqual("addressLine2")
    expect(organization.data.dataValues.cityLocality).toEqual("cityLocality")
    expect(organization.data.dataValues.socialFacebook).toEqual("socialFacebook")
    expect(organization.data.dataValues.socialInstagram).toEqual("socialInstagram")
    expect(organization.data.dataValues.socialLinkedIn).toEqual("socialLinkedIn")
    expect(organization.data.dataValues.socialPinterest).toEqual("socialPinterest")
    expect(organization.data.dataValues.socialReddit).toEqual("socialReddit")
    expect(organization.data.dataValues.socialWhatsapp).toEqual("socialWhatsapp")
    expect(organization.data.dataValues.socialX).toEqual("socialX")
    expect(organization.data.dataValues.socialYouTube).toEqual("socialYouTube")
    expect(organization.data.dataValues.stateProvinceRegion).toEqual("stateProvinceRegion")

    
    /////////////////////////////////////
    // Background Color
    // =================================

    const backgroundColor = await clientSiteBackgroundColor.getOne()
    expect(backgroundColor.data.dataValues.backgroundColor_day).toEqual("backgroundColor_day")
    expect(backgroundColor.data.dataValues.backgroundColor_day).toEqual("backgroundColor_day")

    /////////////////////////////////////
    // Column
    // =================================

    const column = await clientSiteColumn.getOne()
    expect(column.data.dataValues.width).toEqual("width")

    /////////////////////////////////////
    // Font
    // =================================

    const font = await clientSiteFont.getOne()
    expect(font.data.dataValues.font).toEqual("font")




    /////////////////////////////////////
    // page
    // =================================

    const page = await clientSitePage.getOneById({
      id: backendSiteDesignerPageUuid,
    })
    expect(page.data.dataValues.id).toEqual(backendSiteDesignerPageUuid)
    expect(page.data.dataValues.slug).toEqual("/slug/publish-test/should-not-be-saved")




    /////////////////////////////////////
    // page browser
    // =================================

    const pageBrowser = await clientSitePageBrowser.getOneByPageId({
      pageId: backendSiteDesignerPageUuid,
    })
    expect(pageBrowser.data.dataValues.pageId).toEqual(backendSiteDesignerPageUuid)
    expect(pageBrowser.data.dataValues.tabName).toEqual("tabName")




    /////////////////////////////////////
    // page browser
    // =================================

    const pageLink = await clientSitePageLink.getOneByPageId({
      pageId: backendSiteDesignerPageUuid,
    })
    expect(pageLink.data.dataValues.pageId).toEqual(backendSiteDesignerPageUuid)
    expect(pageLink.data.dataValues.title).toEqual("title")
    expect(pageLink.data.dataValues.description).toEqual("description")
    expect(pageLink.data.dataValues.pictureAlt).toEqual("pictureAlt")




    /////////////////////////////////////
    // page browser
    // =================================

    const pageSectionLoud = await clientSitePageSectionLoud.getOneByPageId({
      pageId: backendSiteDesignerPageUuid,
    })
    expect(pageSectionLoud.data.dataValues.pageId).toEqual(backendSiteDesignerPageUuid)
    expect(pageSectionLoud.data.dataValues.userAnswersJsonB).toEqual("{}")
    expect(pageSectionLoud.data.dataValues.webAssetImport).toEqual("built-in/0/loud/homepage/GifHeader/")
    expect(pageSectionLoud.data.dataValues.selectionId).toBe("a3cf9afa-262a-4c82-b290-f35e6eafca9d")
    expect(pageSectionLoud.data.dataValues.selectionType).toEqual(SelectionTypeEnum.BUILT_IN)




    /////////////////////////////////////
    // page browser
    // =================================

    const pageSectionNormal = await clientSitePageSectionNormal.getManyByPageId({
      pageId: backendSiteDesignerPageUuid,
    })
    expect(pageSectionNormal.data[0].dataValues.pageId).toEqual(backendSiteDesignerPageUuid)
    expect(pageSectionNormal.data[0].dataValues.userAnswersJsonB).toEqual("{}")
    expect(pageSectionNormal.data[0].dataValues.webAssetImport).toEqual("built-in/0/sections/SectionHeader/index.jsx")
    expect(pageSectionNormal.data[0].dataValues.selectionId).toBe("f3c9ba04-9e0e-49ac-967e-e001eaecc1e6")
    expect(pageSectionNormal.data[0].dataValues.selectionType).toEqual(SelectionTypeEnum.BUILT_IN)



    // project finished, new project begins:
    // const publishRecord = await backendSiteDesignerPublishRecord.getMany()

    // expect(publishRecord.data.length).toBeGreaterThan(0)


  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

