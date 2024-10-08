import makeBackendProjectSql from "../backendProject.sql";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import makeBackendProjectStatusListsSql from "../backendProjectStatusLists.sql";
import backendProjectPage from "../../../../../models/backend/project/backendProjectPage.model";
import backendProjectColors from "../../../../../models/backend/project/backendProjectColors.model";
import backendProjectBackgroundColor from "../../../../../models/backend/project/backendProjectBackgroundColor.model";
import makeBackendProjectPageSql from "../backendProjectPage.sql";
import backendProject from "../../../../../models/backend/project/backendProject.model";
import makeBackendProjectColorsSql from "../backendProjectColors.sql";
import makeBackendSettingBackgroundColorSql from "../../../setting/backgroundColor/preMain/backendSettingBackgroundColor.sql";
import makeBackendProjectBackgroundColorSql from "../backendProjectBackgroundColor.sql";
import backendProjectBrowser from "../../../../../models/backend/project/backendProjectBrowser.model";
import backendProjectFooter from "../../../../../models/backend/project/backendProjectFooter.model";
import backendProjectHeader from "../../../../../models/backend/project/backendProjectHeader.model";
import backendProjectLink from "../../../../../models/backend/project/backendProjectLink.model";
import backendProjectOrganization from "../../../../../models/backend/project/backendProjectOrganization.model";
import backendProjectColumn from "../../../../../models/backend/project/backendProjectColumn.model";
import backendProjectFont from "../../../../../models/backend/project/backendProjectFont.model";
import makeBackendProjectBrowserSql from "../backendProjectBrowser.sql";
import makeBackendProjectColumnSql from "../backendProjectColumn.sql";
import makeBackendProjectFontSql from "../backendProjectFont.sql";
import makeBackendProjectFooterSql from "../backendProjectFooter.sql";
import makeBackendProjectLinkSql from "../backendProjectLink.sql";
import makeBackendProjectOrganizationSql from "../backendProjectOrganization.sql";
import makeBackendProjectHistoricalStatusListsSql from "../backendProjectHistoricalStatusLists.sql";
import makeBackendProjectHeaderSql from "../backendProjectHeader.sql";
import { PageStatusEnum } from "../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
jest.setTimeout(100000)


describe("test backendProjectHistoricalStatusLists.sql.js", () => {
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
    
    

    const projectSql = makeBackendProjectSql(d)
    const projectPageSql = makeBackendProjectPageSql(d)

    let newProject1 = await projectSql.addOne({
      color: "color",
      name: "initial",
    })
    project1 = newProject1.data.dataValues

    let newProject2 = await projectSql.addOne({
      color: "color2",
      name: "name",
    })
    project2 = newProject2.data.dataValues

    let newPage1 = await projectPageSql.addOne({
      projectId: project1.id,
      slug: "/p/1",
      status: PageStatusEnum.Published,
      isChanged: true,
      isNew: false,
      isDeleted: false,
    })
    page1 = newPage1.data.dataValues

    let newPage2 = await projectPageSql.addOne({
      projectId: project1.id,
      slug: "/p/1",
      status: PageStatusEnum.Published,
      isChanged: true,
      isNew: false,
      isDeleted: false,
    })
    page2 = newPage2.data.dataValues

    let newPage3 = await projectPageSql.addOne({
      projectId: project1.id,
      slug: "/p/1",
      status: PageStatusEnum.Published,
      isChanged: false,
      isNew: true,
      isDeleted: false,
    })
    page3 = newPage3.data.dataValues

    let newPage4 = await projectPageSql.addOne({
      projectId: project1.id,
      slug: "/p/1",
      status: PageStatusEnum.Published,
      isChanged: false,
      isNew: true,
      isDeleted: false,
    })
    page4 = newPage4.data.dataValues

    let newPage5 = await projectPageSql.addOne({
      projectId: project1.id,
      slug: "/p/1",
      status: PageStatusEnum.Published,
      isChanged: false,
      isNew: false,
      isDeleted: true,
    })
    page5 = newPage5.data.dataValues

    let newPage6 = await projectPageSql.addOne({
      projectId: project1.id,
      slug: "/p/1",
      status: PageStatusEnum.Published,
      isChanged: false,
      isNew: false,
      isDeleted: true,
    })
    page6 = newPage6.data.dataValues

    let newPage7 = await projectPageSql.addOne({
      projectId: project1.id,
      slug: "/p/1",
      status: PageStatusEnum.Draft,
      isChanged: true,
      isNew: true,
      isDeleted: false,
    })
    page7 = newPage7.data.dataValues

    let newPage8 = await projectPageSql.addOne({
      projectId: project1.id,
      slug: "/p/1",
      status: PageStatusEnum.Draft,
      isChanged: false,
      isNew: true,
      isDeleted: false,
    })
    page8 = newPage8.data.dataValues

    let newPage9 = await projectPageSql.addOne({
      projectId: project1.id,
      slug: "/p/1",
      status: PageStatusEnum.Draft,
      isChanged: false,
      isNew: false,
      isDeleted: true,
    })
    page9 = newPage9.data.dataValues

    let newPage10 = await projectPageSql.addOne({
      projectId: project1.id,
      slug: "/p/1",
      status: PageStatusEnum.Draft,
      isChanged: false,
      isNew: false,
      isDeleted: true,
    })
    page10 = newPage10.data.dataValues

    // configuration

    const projectColors = makeBackendProjectColorsSql(d);
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

    const projectBrowser = makeBackendProjectBrowserSql(d);
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

    const projectBackgroundColors = makeBackendProjectBackgroundColorSql(d);
    projectBackgroundColor1 = (await projectBackgroundColors.addOne({
      projectId: project1.id,
      backgroundColor_day: "backgroundColor_day",
      backgroundColor_night: "backgroundColor_night",
    })).data.dataValues

    const projectColumn = makeBackendProjectColumnSql(d);
    projectColumn1 = (await projectColumn.addOne({
      projectId: project1.id,
      width: "width",
    })).data.dataValues

    const projectFont = makeBackendProjectFontSql(d);
    projectFont1 = (await projectFont.addOne({
      projectId: project1.id,
      font: "font",
    })).data.dataValues

    const projectFooter = makeBackendProjectFooterSql(d);
    projectFooter1 = (await projectFooter.addOne({
      projectId: project1.id,
      menuJsonB: "menuJsonB",
      userAnswersJsonB: "userAnswersJsonB",
      webAssetImport: "webAssetImport",
    })).data.dataValues

    const projectHeader = makeBackendProjectHeaderSql(d);
    projectHeader1 = (await projectHeader.addOne({
      projectId: project1.id,
      menuJsonB: "menuJsonB",
      userAnswersJsonB: "userAnswersJsonB",
      webAssetImport: "webAssetImport",
    })).data.dataValues

    const projectLink = makeBackendProjectLinkSql(d);
    projectLink1 = (await projectLink.addOne({
      projectId: project1.id,
      description: "description",
      image: "image",
      title: "title",
    })).data.dataValues

    const projectOrganization = makeBackendProjectOrganizationSql(d);
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
    const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

    const getConfigurationCount = await counterSql.getConfiguration({
      projectId: project1.id,
    })

    expect(getConfigurationCount.data.length).toBe(9)
  })

  test("getConfigurationCount: get small count.", async () => {
    const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

    const getConfigurationCount = await counterSql.getConfiguration({
      projectId: project2.id,
    })

    expect(getConfigurationCount.data.length).toBe(2)
  })

  test("getManyDraftedPagesDeletedWithPagination: get records.", async () => {
    const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

    const getManyDraftedPagesDeletedWithPagination = await counterSql.getManyDraftedPagesDeletedWithPagination({
      projectId: project1.id,
    })

    expect(getManyDraftedPagesDeletedWithPagination.data.rows.length).toBe(2)
  })

  test("getManyDraftedPagesNewWithPagination: get records.", async () => {
    const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

    const getManyDraftedPagesNewWithPagination = await counterSql.getManyDraftedPagesNewWithPagination({
      projectId: project1.id,
    })

    expect(getManyDraftedPagesNewWithPagination.data.rows.length).toBe(2)
  })
  
  test("getManyDraftedPagesTotalWithPagination: get records.", async () => {
    const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

    const getManyDraftedPagesTotalWithPagination = await counterSql.getManyDraftedPagesTotalWithPagination({
      projectId: project1.id,
    })

    expect(getManyDraftedPagesTotalWithPagination.data.rows.length).toBe(2)
  })

  test("getManyPublishedPagesChangeWithPagination: get records.", async () => {
    const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

    const getManyPublishedPagesChangeWithPagination = await counterSql.getManyPublishedPagesChangeWithPagination({
      projectId: project1.id,
    })

    expect(getManyPublishedPagesChangeWithPagination.data.rows.length).toBe(2)
  })

  test("getManyPublishedPagesDeletedWithPagination: get records.", async () => {
    const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

    const getManyPublishedPagesDeletedWithPagination = await counterSql.getManyPublishedPagesDeletedWithPagination({
      projectId: project1.id,
    })

    expect(getManyPublishedPagesDeletedWithPagination.data.rows.length).toBe(2)
  })

  test("getManyPublishedPagesNewWithPagination: get records.", async () => {
    const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

    const getManyPublishedPagesNewWithPagination = await counterSql.getManyPublishedPagesNewWithPagination({
      projectId: project1.id,
    })

    expect(getManyPublishedPagesNewWithPagination.data.rows.length).toBe(2)
  })

  test("getManyPublishedPagesTotalWithPagination: get records.", async () => {
    const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

    const getManyPublishedPagesTotalWithPagination = await counterSql.getManyPublishedPagesTotalWithPagination({
      projectId: project1.id,
    })

    expect(getManyPublishedPagesTotalWithPagination.data.rows.length).toBe(4)
  })



  // test("getDraftedPagesTotalCount: get count.", async () => {
  //   const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

  //   const getDraftedPagesTotalCount = await counterSql.getDraftedPagesTotalCount({
  //     projectId: project1.id,
  //   })

  //   expect(getDraftedPagesTotalCount.data).toBe(2)
  // })

  // test("getPublishedPagesChangedCount: get count.", async () => {
  //   const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

  //   const getPublishedPagesChangedCount = await counterSql.getPublishedPagesChangedCount({
  //     projectId: project1.id,
  //   })

  //   expect(getPublishedPagesChangedCount.data).toBe(2)
  // })

  // test("getPublishedPagesDeletedCount: get count.", async () => {
  //   const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

  //   const getPublishedPagesDeletedCount = await counterSql.getPublishedPagesDeletedCount({
  //     projectId: project1.id,
  //   })

  //   expect(getPublishedPagesDeletedCount.data).toBe(2)
  // })

  // test("getPublishedPagesNewCount: get count.", async () => {
  //   const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

  //   const getPublishedPagesNewCount = await counterSql.getPublishedPagesNewCount({
  //     projectId: project1.id,
  //   })

  //   expect(getPublishedPagesNewCount.data).toBe(2)
  // })
  
  // test("getPublishedPagesTotalCount: get count.", async () => {
  //   const counterSql = makeBackendProjectHistoricalStatusListsSql(d)

  //   const getPublishedPagesTotalCount = await counterSql.getPublishedPagesTotalCount({
  //     projectId: project1.id,
  //   })

  //   expect(getPublishedPagesTotalCount.data).toBe(4)
  // })
  






  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

