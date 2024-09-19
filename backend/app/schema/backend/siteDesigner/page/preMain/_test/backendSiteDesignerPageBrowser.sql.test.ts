import makeBackendSiteDesignerPageBrowserSql from "../backendSiteDesignerPageBrowser.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import makeBackendSiteDesignerPageMain from "../../main/backendSiteDesignerPage.main";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
jest.setTimeout(100000)


describe("test backendSiteDesignerPageBrowser.sql.js", () => {
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
    const pageSql = makeBackendSiteDesignerPageBrowserSql(d)

    const upsertOne = await pageSql.upsertOne({
      pageId: pageRecordId,
      tabName: "blah",
    })
    recordId = upsertOne.data.dataValues.id

    expect(upsertOne.data.dataValues.pageId).toEqual(pageRecordId)
    expect(upsertOne.data.dataValues.tabName).toEqual("blah")
  })

  test("getOneById: can get record.", async () => {
    const pageSql = makeBackendSiteDesignerPageBrowserSql(d)

    const getOneByPageId = await pageSql.getOneByPageId({
      pageId: pageRecordId,
    })

    expect(getOneByPageId.data.dataValues.pageId).toEqual(pageRecordId)
    expect(getOneByPageId.data.dataValues.tabName).toEqual("blah")
  })

  test("upsertOne: can edit record.", async () => {
    const pageSql = makeBackendSiteDesignerPageBrowserSql(d)

    const upsertOne = await pageSql.upsertOne({
      id: recordId,
      pageId: pageRecordId,
      tabName: "blah2",
    })

    expect(upsertOne.data.dataValues.pageId).toEqual(pageRecordId)
    expect(upsertOne.data.dataValues.tabName).toEqual("blah2")
  })

  test("getMany: can get all records.", async () => {
    const pageSql = makeBackendSiteDesignerPageBrowserSql(d)

    const getMany = await pageSql.getMany()

    expect(getMany.data.length).toBe(1)
  })

  test("getManyPublishable: can get all records.", async () => {
    const pageSql = makeBackendSiteDesignerPageBrowserSql(d)
    const pageMain = makeBackendSiteDesignerPageMain(d)

    // This record doesn't show up as publishable
    const page2 = await pageMain.addOne({
      slug: "/testing/should-never-be-saved-123012301230/123/123/123/",
      status: PageStatusEnum.Draft,
    })

    await pageSql.upsertOne({
      pageId: page2.data.dataValues.id,
      tabName: "blah",
    })

    const getMany = await pageSql.getManyPublishable()

    expect(getMany.data.length).toBe(1)
  })

  afterAll(async () => {

    await d.dbTransaction.rollback()
  })
})

