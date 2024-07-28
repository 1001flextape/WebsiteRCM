import makeBackendProjectMain from "../../backendProject.main";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import makeBackendSettingColorsMain from "../../../../setting/colors/main/backendSettingColors.main";
import backendSettingColors from "../../../../../../models/backend/setting/backendSettingColors.model";
import makeBackendSettingBackgroundColorMain from "../../../../setting/backgroundColor/main/backendSettingBackgroundColor.main";
import backendSettingBackgroundColor from "../../../../../../models/backend/setting/backendSettingBackgroundColor.model";
import backendSiteDesignerPage from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
import makeBackendSiteDesignerPageMain from "../../../../siteDesigner/page/main/backendSiteDesignerPage.main";
import makeBackendProjectCounterMain from "../../backendProjectCounter.main";
jest.setTimeout(100000)


describe("test backendProjectCounter.main.js", () => {
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
    

    const pageMain = makeBackendSiteDesignerPageMain(d)

    let page1 = await pageMain.addOne({
      slug: "/p/1",
      isReady: false,
      isChanged: false,
      isDraft: false,
      isPublished: false,
      isRecentlyCreated: true,
      isRecentlyDeleted: false,
    })
    record1 = page1.data.dataValues


    let page2 = await pageMain.addOne({
      slug: "/p/2",
      isReady: false,
      isChanged: false,
      isDraft: false,
      isPublished: false,
      isRecentlyCreated: true,
      isRecentlyDeleted: false,
    })
    record2 = page2.data.dataValues


    let page3 = await pageMain.addOne({
      slug: "/p/3",
      isReady: true,
      isChanged: true,
      isDraft: false,
      isPublished: false,
      isRecentlyCreated: true,
      isRecentlyDeleted: false,
    })
    record3 = page3.data.dataValues


    let page4 = await pageMain.addOne({
      slug: "/p/4",
      isReady: true,
      isChanged: true,
      isDraft: false,
      isPublished: true,
      isRecentlyCreated: false,
      isRecentlyDeleted: false,
    })
    record4 = page4.data.dataValues


    let page5 = await pageMain.addOne({
      slug: "/p/5",
      isReady: true,
      isChanged: true,
      isDraft: false,
      isPublished: true,
      isRecentlyCreated: false,
      isRecentlyDeleted: false,
    })
    record5 = page5.data.dataValues


    let page6 = await pageMain.addOne({
      slug: "/p/6",
      isReady: false,
      isChanged: false,
      isDraft: false,
      isPublished: true,
      isRecentlyCreated: true,
      isRecentlyDeleted: false,
    })
    record6 = page6.data.dataValues


    let page7 = await pageMain.addOne({
      slug: "/p/7",
      isReady: true,
      isChanged: true,
      isDraft: true,
      isPublished: false,
      isRecentlyCreated: true,
      isRecentlyDeleted: false,
    })
    record7 = page7.data.dataValues


    let page8 = await pageMain.addOne({
      slug: "/p/8",
      isReady: true,
      isChanged: true,
      isDraft: true,
      isPublished: false,
      isRecentlyCreated: false,
      isRecentlyDeleted: false,
    })
    record8 = page8.data.dataValues


    let page9 = await pageMain.addOne({
      slug: "/p/9",
      isReady: true,
      isChanged: true,
      isDraft: true,
      isPublished: false,
      isRecentlyCreated: false,
      isRecentlyDeleted: false,
    })
    record9 = page9.data.dataValues

    let page10 = await pageMain.addOne({
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
    settingColorsRecord = (await settingColors.upsertOne({
      isChanged: true,
      isReady: true,
    })).data.dataValues

    const settingBackgroundColors = makeBackendSettingBackgroundColorMain(d);
    settingBackgroundColorsRecord = (await settingBackgroundColors.upsertOne({
      isChanged: true,
      isReady: true,
    })).data.dataValues


  }, 100000)

  // getManyDraftedPagesNewWithPagination
  test("getDraftedPagesNewCount: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)

    const getDraftedPagesNewCount = await counterMain.getDraftedPagesNewCount()

    expect(getDraftedPagesNewCount.data).toBe(1)
  })

  test("getDraftedPagesTotalCount: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)

    const getDraftedPagesTotalCount = await counterMain.getDraftedPagesTotalCount()

    expect(getDraftedPagesTotalCount.data).toBe(4)
  })

  test("getNewPagesNewCount: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)

    const getNewPagesNewCount = await counterMain.getNewPagesNewCount()

    expect(getNewPagesNewCount.data).toBe(3)
  })

  test("getNewPagesNotReadyCount: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)

    const getNewPagesNotReadyCount = await counterMain.getNewPagesNotReadyCount()

    expect(getNewPagesNotReadyCount.data).toBe(2)
  })

  test("getNewPagesProgress: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)

    const getNewPagesProgress = await counterMain.getNewPagesProgress()

    expect(getNewPagesProgress.data).toBe(34)
  })

  test("getNewPagesTotalCount: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)

    const getNewPagesTotalCount = await counterMain.getNewPagesTotalCount()

    expect(getNewPagesTotalCount.data).toBe(3)
  })

  test("getPublishedPagesChangedCount: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)

    const getPublishedPagesChangedCount = await counterMain.getPublishedPagesChangedCount()

    expect(getPublishedPagesChangedCount.data).toBe(2)
  })

  test("getPublishedPagesNotReadyCount: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)

    const getPublishedPagesNotReadyCount = await counterMain.getPublishedPagesNotReadyCount()

    expect(getPublishedPagesNotReadyCount.data).toBe(1)
  })

  test("getPublishedPagesProgress: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)

    const getPublishedPagesProgress = await counterMain.getPublishedPagesProgress()

    expect(getPublishedPagesProgress.data).toBe(67)
  })

  test("getPublishedPagesTotalCount: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)

    const getPublishedPagesTotalCount = await counterMain.getPublishedPagesTotalCount()

    expect(getPublishedPagesTotalCount.data).toBe(3)
  })

  test("getDraftedPagesDeletedCount: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)
    const pageMain = makeBackendSiteDesignerPageMain(d)

    await pageMain.deleteOne({
      id: record8.id,
    })

    const getDraftedPagesDeletedCount = await counterMain.getDraftedPagesDeletedCount()

    expect(getDraftedPagesDeletedCount.data).toBe(1)
  })

  test("getNewPagesDeletedCount: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)
    const pageMain = makeBackendSiteDesignerPageMain(d)

    await pageMain.deleteOne({
      id: record1.id,
    })

    const getNewPagesDeletedCount = await counterMain.getNewPagesDeletedCount()

    expect(getNewPagesDeletedCount.data).toBe(1)
  })

  test("getPublishedPagesDeletedCount: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)
    const pageMain = makeBackendSiteDesignerPageMain(d)

    await pageMain.deleteOne({
      id: record4.id,
    })

    const getPublishedPagesDeletedCount = await counterMain.getPublishedPagesDeletedCount()

    expect(getPublishedPagesDeletedCount.data).toBe(1)
  })


  test("getConfigurationChangedCount: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)

    const getConfigurationChangedCount = await counterMain.getConfigurationChangedCount()

    expect(getConfigurationChangedCount.data).toBe(2)
  })

  test("getConfigurationNotReadyCount: filter list records.", async () => {
    console.log('isReady', settingColorsRecord.isReady, "isChanged", settingBackgroundColorsRecord.isReady);

    const counterMain = makeBackendProjectCounterMain(d)



    const getConfigurationNotReadyCount = await counterMain.getConfigurationNotReadyCount()

    expect(getConfigurationNotReadyCount.data).toBe(7)
  })

  test("getConfigurationProgress: filter list records.", async () => {
    const counterMain = makeBackendProjectCounterMain(d)

    const getConfigurationProgress = await counterMain.getConfigurationProgress()

    expect(getConfigurationProgress.data).toBe(23)
  })




  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})

