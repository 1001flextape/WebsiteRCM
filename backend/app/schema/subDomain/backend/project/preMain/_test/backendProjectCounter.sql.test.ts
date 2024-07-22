import makeBackendProjectSql from "../backendProject.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import makeBackendProjectCounterSql from "../backendProjectCounter.sql";
import makeBackendSettingColorsMain from "../../../setting/colors/main/backendSettingColors.main";
import backendSettingColors from "../../../../../../models/subDomain/backend/setting/backendSettingColors.model";
import makeBackendSettingBackgroundColorMain from "../../../setting/backgroundColor/main/backendSettingBackgroundColor.main";
import backendSettingBackgroundColor from "../../../../../../models/subDomain/backend/setting/backendSettingBackgroundColor.model";
import backendSiteDesignerPage from "../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPage.model";
import makeBackendSiteDesignerPageSql from "../../../siteDesigner/page/preMain/backendSiteDesignerPage.sql";
jest.setTimeout(100000)


describe("test backendProjectCounter.sql.js", () => {
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
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

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

    const settingColors = makeBackendSettingColorsMain(d);
    const currentSettingColors = await settingColors.getOne()
    settingColorsRecord = (await settingColors.upsertOne({
      id: currentSettingColors.data.dataValues.id,
      isChanged: true,
      isReady: true,
    })).data.dataValues

    const settingBackgroundColors = makeBackendSettingBackgroundColorMain(d);
    const currentSettingBackgroundColors = await settingBackgroundColors.getOne()
    settingBackgroundColorsRecord = (await settingBackgroundColors.upsertOne({
      id: currentSettingBackgroundColors.data.dataValues.id,
      isChanged: true,
      isReady: true,
    })).data.dataValues


  }, 100000)

  // getManyDraftedPagesNewWithPagination
  test("getDraftedPagesNewCount: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)
                       
    const getDraftedPagesNewCount = await counterSql.getDraftedPagesNewCount()

    expect(getDraftedPagesNewCount.data).toBe(1)
  })

  test("getDraftedPagesTotalCount: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)

    const getDraftedPagesTotalCount = await counterSql.getDraftedPagesTotalCount()

    expect(getDraftedPagesTotalCount.data).toBe(4)
  })

  test("getNewPagesNewCount: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)

    const getNewPagesNewCount = await counterSql.getNewPagesNewCount()

    expect(getNewPagesNewCount.data).toBe(3)
  })

  test("getNewPagesNotReadyCount: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)

    const getNewPagesNotReadyCount = await counterSql.getNewPagesNotReadyCount()

    expect(getNewPagesNotReadyCount.data).toBe(2)
  })

  test("getNewPagesProgress: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)

    const getNewPagesProgress = await counterSql.getNewPagesProgress()

    expect(getNewPagesProgress.data).toBe(34)
  })

  test("getNewPagesTotalCount: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)

    const getNewPagesTotalCount = await counterSql.getNewPagesTotalCount()

    expect(getNewPagesTotalCount.data).toBe(3)
  })

  test("getPublishedPagesChangedCount: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)

    const getPublishedPagesChangedCount = await counterSql.getPublishedPagesChangedCount()

    expect(getPublishedPagesChangedCount.data).toBe(2)
  })

  test("getPublishedPagesNotReadyCount: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)

    const getPublishedPagesNotReadyCount = await counterSql.getPublishedPagesNotReadyCount()

    expect(getPublishedPagesNotReadyCount.data).toBe(1)
  })

  test("getPublishedPagesProgress: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)

    const getPublishedPagesProgress = await counterSql.getPublishedPagesProgress()

    expect(getPublishedPagesProgress.data).toBe(67)
  })

  test("getPublishedPagesTotalCount: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)

    const getPublishedPagesTotalCount = await counterSql.getPublishedPagesTotalCount()

    expect(getPublishedPagesTotalCount.data).toBe(3)
  })

  test("getDraftedPagesDeletedCount: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)
    const pageSql = makeBackendSiteDesignerPageSql(d)

    await pageSql.deleteOne({
      id: record8.id,
    })

    const getDraftedPagesDeletedCount = await counterSql.getDraftedPagesDeletedCount()

    expect(getDraftedPagesDeletedCount.data).toBe(1)
  })

  test("getNewPagesDeletedCount: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)
    const pageSql = makeBackendSiteDesignerPageSql(d)

    await pageSql.deleteOne({
      id: record1.id,
    })

    const getNewPagesDeletedCount = await counterSql.getNewPagesDeletedCount()

    expect(getNewPagesDeletedCount.data).toBe(1)
  })

  test("getPublishedPagesDeletedCount: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)
    const pageSql = makeBackendSiteDesignerPageSql(d)

    await pageSql.deleteOne({
      id: record4.id,
    })

    const getPublishedPagesDeletedCount = await counterSql.getPublishedPagesDeletedCount()

    expect(getPublishedPagesDeletedCount.data).toBe(1)
  })


  test("getConfigurationChangedCount: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)

    const getConfigurationChangedCount = await counterSql.getConfigurationChangedCount()

    expect(getConfigurationChangedCount.data).toBe(2)
  })

  test("getConfigurationNotReadyCount: filter list records.", async () => {
    console.log('isReady', settingColorsRecord.isReady, "isChanged", settingBackgroundColorsRecord.isReady);

    const counterSql = makeBackendProjectCounterSql(d)



    const getConfigurationNotReadyCount = await counterSql.getConfigurationNotReadyCount()

    expect(getConfigurationNotReadyCount.data).toBe(7)
  })

  test("getConfigurationProgress: filter list records.", async () => {
    const counterSql = makeBackendProjectCounterSql(d)

    const getConfigurationProgress = await counterSql.getConfigurationProgress()

    expect(getConfigurationProgress.data).toBe(23)
  })




  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

