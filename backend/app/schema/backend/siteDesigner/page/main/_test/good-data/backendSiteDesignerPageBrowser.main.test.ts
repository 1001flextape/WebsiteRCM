import makeBackendSiteDesignerPageBrowserMain from "../../backendSiteDesignerPageBrowser.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import makeBackendSiteDesignerPageMain from "../../backendSiteDesignerPage.main";
import { PageStatusEnum } from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
jest.setTimeout(100000)


describe("test backendSiteDesignerPageBrowser.main.js", () => {
  let d: dependencies
  let recordId: string
  let pageRecordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    
    

    const pageMain = makeBackendSiteDesignerPageMain(d)

    const pageRecord = await pageMain.addOne({
      slug: "/testing/should-never-be-saved-123012301230/123/123/123/",
      status: PageStatusEnum.New,
    })

    pageRecordId = pageRecord.data.dataValues.id

  }, 100000)

  test("upsertOne: can add record.", async () => {
    const pageMain = makeBackendSiteDesignerPageBrowserMain(d)

    const upsertOne = await pageMain.upsertOne({
      pageId: pageRecordId,
      tabName: "blah",
    })
    recordId = upsertOne.data.dataValues.id

    expect(upsertOne.data.dataValues.pageId).toEqual(pageRecordId)
    expect(upsertOne.data.dataValues.tabName).toEqual("blah")
  })

  test("getOneById: can get record.", async () => {
    const pageMain = makeBackendSiteDesignerPageBrowserMain(d)

    const getOneByPageId = await pageMain.getOneByPageId({
      pageId: pageRecordId,
    })

    expect(getOneByPageId.data.dataValues.pageId).toEqual(pageRecordId)
    expect(getOneByPageId.data.dataValues.tabName).toEqual("blah")
  })

  test("upsertOne: can edit record.", async () => {
    const pageMain = makeBackendSiteDesignerPageBrowserMain(d)

    const upsertOne = await pageMain.upsertOne({
      id: recordId,
      pageId: pageRecordId,
      tabName: "blah2",
    })

    expect(upsertOne.data.dataValues.pageId).toEqual(pageRecordId)
    expect(upsertOne.data.dataValues.tabName).toEqual("blah2")
  })
  
  test("getMany: can get all records.", async () => {
    const pageMain = makeBackendSiteDesignerPageBrowserMain(d)

    const getMany = await pageMain.getMany()

    expect(getMany.data.length).toBe(1)
  })

  test("getManyPublishable: can get all records.", async () => {
    const main = makeBackendSiteDesignerPageBrowserMain(d)
    const pageMain = makeBackendSiteDesignerPageMain(d)

    // This record doesn't show up as publishable
    const page2 = await pageMain.addOne({
      slug: "/testing/should-never-be-saved-123012301230/123/123/123/",
      status: PageStatusEnum.Draft,
    })

    await main.upsertOne({
      pageId: page2.data.dataValues.id,
      tabName: "blah",
    })

    const getMany = await main.getManyPublishable()

    expect(getMany.data.length).toBe(1)
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

