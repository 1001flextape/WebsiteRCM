import makeBackendProjectMain from "../../backendProject.main";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import backendProjectPage from "../../../../../../models/backend/project/backendProjectPage.model";
import backendProjectColors from "../../../../../../models/backend/project/backendProjectColors.model";
import backendProjectBackgroundColor from "../../../../../../models/backend/project/backendProjectBackgroundColor.model";
import makeBackendProjectPageMain from "../../backendProjectPage.main";
import backendProject from "../../../../../../models/backend/project/backendProject.model";
import makeBackendProjectColorsMain from "../../backendProjectColors.main";
import makeBackendProjectBackgroundColorMain from "../../backendProjectBackgroundColor.main";
import backendProjectBrowser from "../../../../../../models/backend/project/backendProjectBrowser.model";
import backendProjectFooter from "../../../../../../models/backend/project/backendProjectFooter.model";
import backendProjectHeader from "../../../../../../models/backend/project/backendProjectHeader.model";
import backendProjectLink from "../../../../../../models/backend/project/backendProjectLink.model";
import backendProjectOrganization from "../../../../../../models/backend/project/backendProjectOrganization.model";
import backendProjectColumn from "../../../../../../models/backend/project/backendProjectColumn.model";
import backendProjectFont from "../../../../../../models/backend/project/backendProjectFont.model";
import makeBackendProjectBrowserMain from "../../backendProjectBrowser.main";
import makeBackendProjectColumnMain from "../../backendProjectColumn.main";
import makeBackendProjectFontMain from "../../backendProjectFont.main";
import makeBackendProjectFooterMain from "../../backendProjectFooter.main";
import makeBackendProjectLinkMain from "../../backendProjectLink.main";
import makeBackendProjectOrganizationMain from "../../backendProjectOrganization.main";
import makeBackendProjectHistoricalCounterMain from "../../backendProjectHistoricalCounter.main";
import makeBackendProjectHeaderMain from "../../backendProjectHeader.main";
jest.setTimeout(100000)


describe("test backendProjectHistoricalCounter.main.js", () => {
  let d: dependencies
  let project1: backendProject
  let project2: backendProject
  let page1: backendProjectPage
  let page2: backendProjectPage
  let page3: backendProjectPage
  let page4: backendProjectPage
  let page5: backendProjectPage
  let page6: backendProjectPage
  let page7: backendProjectPage
  let page8: backendProjectPage
  let page9: backendProjectPage
  let page10: backendProjectPage
  let projectBackgroundColor1: backendProjectBackgroundColor
  let projectBrowser1: backendProjectBrowser
  let projectBrowser2: backendProjectBrowser
  let projectColors1: backendProjectColors
  let projectColors2: backendProjectColors
  let projectColumn1: backendProjectColumn
  let projectFont1: backendProjectFont
  let projectFooter1: backendProjectFooter
  let projectHeader1: backendProjectHeader
  let projectLink1: backendProjectLink
  let projectOrganization1: backendProjectOrganization

  beforeAll(async () => {

    d = await makeDTestObj()
    

    const projectMain = makeBackendProjectMain(d)
    const projectPageMain = makeBackendProjectPageMain(d)

    let newProject1 = await projectMain.addOne({
      color: "color",
      name: "initial",
    })
    project1 = newProject1.data.dataValues

    let newProject2 = await projectMain.addOne({
      color: "color2",
      name: "name",
    })
    project2 = newProject2.data.dataValues

    let newPage1 = await projectPageMain.addOne({
      projectId: project1.id,
      slug: "/p/1",
      isDraft: false,
      isPublished: true,
      isChanged: true,
      isNew: false,
      isDeleted: false,
    })
    page1 = newPage1.data.dataValues

    let newPage2 = await projectPageMain.addOne({
      projectId: project1.id,
      slug: "/p/1",
      isDraft: false,
      isPublished: true,
      isChanged: true,
      isNew: false,
      isDeleted: false,
    })
    page2 = newPage2.data.dataValues

    let newPage3 = await projectPageMain.addOne({
      projectId: project1.id,
      slug: "/p/1",
      isDraft: false,
      isPublished: true,
      isChanged: false,
      isNew: true,
      isDeleted: false,
    })
    page3 = newPage3.data.dataValues

    let newPage4 = await projectPageMain.addOne({
      projectId: project1.id,
      slug: "/p/1",
      isDraft: false,
      isPublished: true,
      isChanged: false,
      isNew: true,
      isDeleted: false,
    })
    page4 = newPage4.data.dataValues

    let newPage5 = await projectPageMain.addOne({
      projectId: project1.id,
      slug: "/p/1",
      isDraft: false,
      isPublished: true,
      isChanged: false,
      isNew: false,
      isDeleted: true,
    })
    page5 = newPage5.data.dataValues

    let newPage6 = await projectPageMain.addOne({
      projectId: project1.id,
      slug: "/p/1",
      isDraft: false,
      isPublished: true,
      isChanged: false,
      isNew: false,
      isDeleted: true,
    })
    page6 = newPage6.data.dataValues

    let newPage7 = await projectPageMain.addOne({
      projectId: project1.id,
      slug: "/p/1",
      isDraft: true,
      isPublished: false,
      isChanged: true,
      isNew: true,
      isDeleted: false,
    })
    page7 = newPage7.data.dataValues

    let newPage8 = await projectPageMain.addOne({
      projectId: project1.id,
      slug: "/p/1",
      isDraft: true,
      isPublished: false,
      isChanged: false,
      isNew: true,
      isDeleted: false,
    })
    page8 = newPage8.data.dataValues

    let newPage9 = await projectPageMain.addOne({
      projectId: project1.id,
      slug: "/p/1",
      isDraft: true,
      isPublished: false,
      isChanged: false,
      isNew: false,
      isDeleted: true,
    })
    page9 = newPage9.data.dataValues

    let newPage10 = await projectPageMain.addOne({
      projectId: project1.id,
      slug: "/p/1",
      isDraft: true,
      isPublished: false,
      isChanged: false,
      isNew: false,
      isDeleted: true,
    })
    page10 = newPage10.data.dataValues

    // configuration

    const projectColors = makeBackendProjectColorsMain(d);
    projectColors1 = (await projectColors.addOne({
      projectId: project1.id,
      color1: "color1",
      color2: "color2",
      color3: "color3",
      color4: "color4",
      color5: "color5",
      color6: "color6",
      color7: "color7",
    })).data.dataValues

    projectColors2 = (await projectColors.addOne({
      projectId: project2.id,
      color1: "color21",
      color2: "color22",
      color3: "color23",
      color4: "color24",
      color5: "color25",
      color6: "color26",
      color7: "color27",
    })).data.dataValues

    const projectBrowser = makeBackendProjectBrowserMain(d);
    projectBrowser1 = (await projectBrowser.addOne({
      projectId: project1.id,
      favicon: "favicon",
      tab: "tab",
    })).data.dataValues

    projectBrowser2 = (await projectBrowser.addOne({
      projectId: project2.id,
      favicon: "favicon2",
      tab: "tab2",
    })).data.dataValues

    const projectBackgroundColors = makeBackendProjectBackgroundColorMain(d);
    projectBackgroundColor1 = (await projectBackgroundColors.addOne({
      projectId: project1.id,
      backgroundColor_day: "backgroundColor_day",
      backgroundColor_night: "backgroundColor_night",
    })).data.dataValues

    const projectColumn = makeBackendProjectColumnMain(d);
    projectColumn1 = (await projectColumn.addOne({
      projectId: project1.id,
      width: "width",
    })).data.dataValues

    const projectFont = makeBackendProjectFontMain(d);
    projectFont1 = (await projectFont.addOne({
      projectId: project1.id,
      font: "font",
      varient: "varient",
    })).data.dataValues

    const projectFooter = makeBackendProjectFooterMain(d);
    projectFooter1 = (await projectFooter.addOne({
      projectId: project1.id,
      menuJsonB: "menuJsonB",
      userAnswersJsonB: "userAnswersJsonB",
      webAssetImport: "webAssetImport",
    })).data.dataValues

    const projectHeader = makeBackendProjectHeaderMain(d);
    projectHeader1 = (await projectHeader.addOne({
      projectId: project1.id,
      menuJsonB: "menuJsonB",
      userAnswersJsonB: "userAnswersJsonB",
      webAssetImport: "webAssetImport",
    })).data.dataValues

    const projectLink = makeBackendProjectLinkMain(d);
    projectLink1 = (await projectLink.addOne({
      projectId: project1.id,
      description: "description",
      image: "image",
      title: "title",
    })).data.dataValues

    const projectOrganization = makeBackendProjectOrganizationMain(d);
    projectOrganization1 = (await projectOrganization.addOne({
      projectId: project1.id,
      addressLine1: "addressLine1",
      addressLine2: "addressLine2",
      cityLocality: "cityLocality",
    })).data.dataValues



    // let projectBackgroundColorRecord: backendProjectBackgroundColor
    // let projectBrowser1: backendProjectBrowser
    // let projectColors1: backendProjectColors
    // let projectColumn1: backendProjectColumn
    // let projectFont1: backendProjectFont
    // let projectFooter1: backendProjectFooter
    // let projectHeader1: backendProjectHeader
    // let projectLink1: backendProjectLink
    // let projectOrganization1: backendProjectOrganization
  }, 100000)

  // getManyDraftedPagesNewWithPagination
  test("getConfigurationCount: get large count.", async () => {
    const counterMain = makeBackendProjectHistoricalCounterMain(d)

    const getConfigurationCount = await counterMain.getConfigurationCount({
      projectId: project1.id,
    })

    expect(getConfigurationCount.data).toBe(9)
  })

  test("getConfigurationCount: get small count.", async () => {
    const counterMain = makeBackendProjectHistoricalCounterMain(d)

    const getConfigurationCount = await counterMain.getConfigurationCount({
      projectId: project2.id,
    })

    expect(getConfigurationCount.data).toBe(2)
  })

  test("getDraftedPagesDeletedCount: get count.", async () => {
    const counterMain = makeBackendProjectHistoricalCounterMain(d)

    const getDraftedPagesDeletedCount = await counterMain.getDraftedPagesDeletedCount({
      projectId: project1.id,
    })

    expect(getDraftedPagesDeletedCount.data).toBe(2)
  })

  test("getDraftedPagesNewCount: get count.", async () => {
    const counterMain = makeBackendProjectHistoricalCounterMain(d)

    const getDraftedPagesNewCount = await counterMain.getDraftedPagesNewCount({
      projectId: project1.id,
    })

    expect(getDraftedPagesNewCount.data).toBe(2)
  })

  test("getDraftedPagesTotalCount: get count.", async () => {
    const counterMain = makeBackendProjectHistoricalCounterMain(d)

    const getDraftedPagesTotalCount = await counterMain.getDraftedPagesTotalCount({
      projectId: project1.id,
    })

    expect(getDraftedPagesTotalCount.data).toBe(2)
  })

  test("getPublishedPagesChangedCount: get count.", async () => {
    const counterMain = makeBackendProjectHistoricalCounterMain(d)

    const getPublishedPagesChangedCount = await counterMain.getPublishedPagesChangedCount({
      projectId: project1.id,
    })

    expect(getPublishedPagesChangedCount.data).toBe(2)
  })

  test("getPublishedPagesDeletedCount: get count.", async () => {
    const counterMain = makeBackendProjectHistoricalCounterMain(d)

    const getPublishedPagesDeletedCount = await counterMain.getPublishedPagesDeletedCount({
      projectId: project1.id,
    })

    expect(getPublishedPagesDeletedCount.data).toBe(2)
  })

  test("getPublishedPagesNewCount: get count.", async () => {
    const counterMain = makeBackendProjectHistoricalCounterMain(d)

    const getPublishedPagesNewCount = await counterMain.getPublishedPagesNewCount({
      projectId: project1.id,
    })

    expect(getPublishedPagesNewCount.data).toBe(2)
  })

  test("getPublishedPagesTotalCount: get count.", async () => {
    const counterMain = makeBackendProjectHistoricalCounterMain(d)

    const getPublishedPagesTotalCount = await counterMain.getPublishedPagesTotalCount({
      projectId: project1.id,
    })

    expect(getPublishedPagesTotalCount.data).toBe(4)
  })







  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})

