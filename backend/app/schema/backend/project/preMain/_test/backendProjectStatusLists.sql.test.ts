import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import makeBackendProjectStatusListSql from "../backendProjectStatusLists.sql";
import backendSiteDesignerPage from "../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
import makeBackendSiteDesignerPageSql from "../../../siteDesigner/page/preMain/backendSiteDesignerPage.sql";
import makeBackendSettingColorsMain from "../../../setting/colors/main/backendSettingColors.main";
import makeBackendSettingBackgroundColorMain from "../../../setting/backgroundColor/main/backendSettingBackgroundColor.main";
import backendSettingBackgroundColor from "../../../../../models/backend/setting/backendSettingBackgroundColor.model";
import backendSettingColors from "../../../../../models/backend/setting/backendSettingColors.model";
import makeBackendSettingColorsSql from "../../../setting/colors/preMain/backendSettingColors.sql";
import makeBackendSettingBackgroundColorSql from "../../../setting/backgroundColor/preMain/backendSettingBackgroundColor.sql";
jest.setTimeout(100000)


describe("test backendProjectStatusLists.sql.js", () => {
  let d: dependencies
  let record1: backendSiteDesignerPage
  let record2: backendSiteDesignerPage
  let record3: backendSiteDesignerPage
  let record4: backendSiteDesignerPage
  let record5: backendSiteDesignerPage
  let record6: backendSiteDesignerPage
  let record7: backendSiteDesignerPage
  let record8: backendSiteDesignerPage
  let record9: backendSiteDesignerPage
  let record10: backendSiteDesignerPage
  let settingColorsRecord: backendSettingColors
  let settingBackgroundColorsRecord: backendSettingBackgroundColor


  beforeAll(async () => {

    d = await makeDTestObj()
    
    

    const pageSql = makeBackendSiteDesignerPageSql(d)

    let page1 = await pageSql.addOne({
      slug: "/p/1",
      isReady: false,
      isChanged: false,
      isDraft: false,
      isPublished: false,
      isRecentlyCreated: true,
      isRecentlyDeleted: false,
    })
    record1 = page1.data.dataValues

    
    let page2 = await pageSql.addOne({
      slug: "/p/2",
      isReady: false,
      isChanged: false,
      isDraft: false,
      isPublished: false,
      isRecentlyCreated: true,
      isRecentlyDeleted: false,
    })
    record2 = page2.data.dataValues

    
    let page3 = await pageSql.addOne({
      slug: "/p/3",
      isReady: true,
      isChanged: true,
      isDraft: false,
      isPublished: false,
      isRecentlyCreated: true,
      isRecentlyDeleted: false,
    })
    record3 = page3.data.dataValues

    
    let page4 = await pageSql.addOne({
      slug: "/p/4",
      isReady: true,
      isChanged: true,
      isDraft: false,
      isPublished: true,
      isRecentlyCreated: false,
      isRecentlyDeleted: false,
    })
    record4 = page4.data.dataValues

    
    let page5 = await pageSql.addOne({
      slug: "/p/5",
      isReady: true,
      isChanged: true,
      isDraft: false,
      isPublished: true,
      isRecentlyCreated: false,
      isRecentlyDeleted: false,
    })
    record5 = page5.data.dataValues

    
    let page6 = await pageSql.addOne({
      slug: "/p/6",
      isReady: false,
      isChanged: false,
      isDraft: false,
      isPublished: true,
      isRecentlyCreated: true,
      isRecentlyDeleted: false,
    })
    record6 = page6.data.dataValues

    
    let page7 = await pageSql.addOne({
      slug: "/p/7",
      isReady: true,
      isChanged: true,
      isDraft: true,
      isPublished: false,
      isRecentlyCreated: true,
      isRecentlyDeleted: false,
    })
    record7 = page7.data.dataValues

    
    let page8 = await pageSql.addOne({
      slug: "/p/8",
      isReady: true,
      isChanged: true,
      isDraft: true,
      isPublished: false,
      isRecentlyCreated: false,
      isRecentlyDeleted: false,
    })
    record8 = page8.data.dataValues

    
    let page9 = await pageSql.addOne({
      slug: "/p/9",
      isReady: true,
      isChanged: true,
      isDraft: true,
      isPublished: false,
      isRecentlyCreated: false,
      isRecentlyDeleted: false,
    })
    record9 = page9.data.dataValues

    let page10 = await pageSql.addOne({
      slug: "/p/1",
      isReady: true,
      isChanged: true,
      isDraft: true,
      isPublished: false,
      isRecentlyCreated: false,
      isRecentlyDeleted: false,
    })
    record10 = page10.data.dataValues

    
    const settingColors = makeBackendSettingColorsSql(d);
    settingColorsRecord = (await settingColors.upsertOne({
      isChanged: true,
      isReady: true,
    })).data.dataValues

    const settingBackgroundColors = makeBackendSettingBackgroundColorSql(d);
    settingBackgroundColorsRecord = (await settingBackgroundColors.upsertOne({
      isChanged: true,
      isReady: true,
    })).data.dataValues



    
    // const settingBackgroundColor = makeBackendSettingBackgroundColorMain(d);
    
    // const settingColors = makeBackendSettingColorsMain(d);
    // const settingColumn = makeBackendSettingColumnMain(d);
    // const settingFont = makeBackendSettingFontMain(d);
    // const settingFooter = makeBackendSettingFooterMain(d);
    // const settingHeader = makeBackendSettingHeaderMain(d);
    // const settingLink = makeBackendSettingLinkMain(d);
    // const settingBrowser = makeBackendSettingSiteMain(d);
    // const settingOrganization = makeBackendSettingOrganizationMain(d);
    

  }, 100000)

  test("getManyDraftedPagesNewWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getManyDraftedPagesNewWithPagination = await statusListSql.getManyDraftedPagesNewWithPagination({})

    expect(getManyDraftedPagesNewWithPagination.data.rows.length).toBe(1)
  })

  test("getManyDraftedPagesTotalWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getManyDraftedPagesTotalWithPagination = await statusListSql.getManyDraftedPagesTotalWithPagination({})

    expect(getManyDraftedPagesTotalWithPagination.data.rows.length).toBe(4)
  })

  test("getManyNewPagesNewWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getManyNewPagesNewWithPagination = await statusListSql.getManyNewPagesNewWithPagination({})

    expect(getManyNewPagesNewWithPagination.data.rows.length).toBe(3)
  })

  test("getManyNewPagesNotReadyWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getManyNewPagesNotReadyWithPagination = await statusListSql.getManyNewPagesNotReadyWithPagination({})

    expect(getManyNewPagesNotReadyWithPagination.data.rows.length).toBe(2)
  })

  test("getManyNewPagesReadyWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getManyNewPagesReadyWithPagination = await statusListSql.getManyNewPagesReadyWithPagination({})

    expect(getManyNewPagesReadyWithPagination.data.rows.length).toBe(1)
  })

  test("getManyNewPagesTotalWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getManyNewPagesTotalWithPagination = await statusListSql.getManyNewPagesTotalWithPagination({})

    expect(getManyNewPagesTotalWithPagination.data.rows.length).toBe(3)
  })

  test("getManyPublishedPagesChangeWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getManyPublishedPagesChangeWithPagination = await statusListSql.getManyPublishedPagesChangeWithPagination({})

    expect(getManyPublishedPagesChangeWithPagination.data.rows.length).toBe(2)
  })

  test("getManyPublishedPagesNotReadyWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getManyPublishedPagesNotReadyWithPagination = await statusListSql.getManyPublishedPagesNotReadyWithPagination({})

    expect(getManyPublishedPagesNotReadyWithPagination.data.rows.length).toBe(1)
  })

  test("getManyPublishedPagesReadyWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getManyPublishedPagesReadyWithPagination = await statusListSql.getManyPublishedPagesReadyWithPagination({})

    expect(getManyPublishedPagesReadyWithPagination.data.rows.length).toBe(2)
  })

  test("getManyPublishedPagesTotalWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getManyPublishedPagesTotalWithPagination = await statusListSql.getManyPublishedPagesTotalWithPagination({})

    expect(getManyPublishedPagesTotalWithPagination.data.rows.length).toBe(3)
  })

  test("getManyDraftedPagesDeletedWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)
    const pageSql = makeBackendSiteDesignerPageSql(d)

    await pageSql.deleteOne({
      id: record8.id,
    })

    const getManyDraftedPagesDeletedWithPagination = await statusListSql.getManyDraftedPagesDeletedWithPagination({})

    expect(getManyDraftedPagesDeletedWithPagination.data.rows.length).toBe(1)
  })

  test("getManyNewPagesDeletedWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)
    const pageSql = makeBackendSiteDesignerPageSql(d)

    await pageSql.deleteOne({
      id: record1.id,
    })

    const getManyNewPagesDeletedWithPagination = await statusListSql.getManyNewPagesDeletedWithPagination({})

    expect(getManyNewPagesDeletedWithPagination.data.rows.length).toBe(1)
  })

  test("getManyPublishedPagesDeletedWithPagination: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)
    const pageSql = makeBackendSiteDesignerPageSql(d)

    await pageSql.deleteOne({
      id: record4.id,
    })

    const getManyPublishedPagesDeletedWithPagination = await statusListSql.getManyPublishedPagesDeletedWithPagination({})

    expect(getManyPublishedPagesDeletedWithPagination.data.rows.length).toBe(1)
  })

  test("getConfigurationChanged: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getConfigurationChanged = await statusListSql.getConfigurationChanged()

    expect(getConfigurationChanged.data.length).toBe(2)
  })

  test("getConfigurationNotReady: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getConfigurationNotReady = await statusListSql.getConfigurationNotReady()

    expect(getConfigurationNotReady.data.length).toBe(7)
  })

  test("getConfigurationReady: filter list records.", async () => {
    const statusListSql = makeBackendProjectStatusListSql(d)

    const getConfigurationReady = await statusListSql.getConfigurationReady()

    expect(getConfigurationReady.data.length).toBe(2)
  })








  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

