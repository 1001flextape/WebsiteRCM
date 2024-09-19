import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import makeBackendSiteDesignerPageMain from "../../main/backendSiteDesignerPage.main";
import makeBackendSiteDesignerPageLinkSql from "../backendSiteDesignerPageLink.sql";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
jest.setTimeout(100000)


describe("test backendSiteDesignerPageLink.sql.js", () => {
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
    const pageSql = makeBackendSiteDesignerPageLinkSql(d)

    const upsertOne = await pageSql.upsertOne({
      pageId: pageRecordId,
      title: "title",
      description: "description",
      picture: "picture",
      pictureAlt: "pictureAlt",
    })
    recordId = upsertOne.data.dataValues.id

    expect(upsertOne.data.dataValues.pageId).toEqual(pageRecordId)
    expect(upsertOne.data.dataValues.title).toEqual("title")
    expect(upsertOne.data.dataValues.description).toEqual("description")
    expect(upsertOne.data.dataValues.picture).toEqual("picture")
    expect(upsertOne.data.dataValues.pictureAlt).toEqual("pictureAlt")
  })

  test("getOneById: can get record.", async () => {
    const pageSql = makeBackendSiteDesignerPageLinkSql(d)

    const getOneByPageId = await pageSql.getOneByPageId({
      pageId: pageRecordId,
    })

    expect(getOneByPageId.data.dataValues.pageId).toEqual(pageRecordId)
    expect(getOneByPageId.data.dataValues.title).toEqual("title")
    expect(getOneByPageId.data.dataValues.description).toEqual("description")
    expect(getOneByPageId.data.dataValues.picture).toEqual("picture")
    expect(getOneByPageId.data.dataValues.pictureAlt).toEqual("pictureAlt")
  })

  test("upsertOne: can edit record.", async () => {
    const pageSql = makeBackendSiteDesignerPageLinkSql(d)

    const upsertOne = await pageSql.upsertOne({
      id: recordId,
      pageId: pageRecordId,
      title: "title2",
      description: "description2",
      picture: "picture2",
      pictureAlt: "pictureAlt2",
    })

    expect(upsertOne.data.dataValues.pageId).toEqual(pageRecordId)
    expect(upsertOne.data.dataValues.title).toEqual("title2")
    expect(upsertOne.data.dataValues.description).toEqual("description2")
    expect(upsertOne.data.dataValues.picture).toEqual("picture2")
    expect(upsertOne.data.dataValues.pictureAlt).toEqual("pictureAlt2")
  })

  test("getMany: can get all records.", async () => {
    const pageSql = makeBackendSiteDesignerPageLinkSql(d)

    const getMany = await pageSql.getMany()

    expect(getMany.data.length).toBe(1)
  })

  test("getManyPublishable: can get all records.", async () => {
    const sql = makeBackendSiteDesignerPageLinkSql(d)
    const pageMain = makeBackendSiteDesignerPageMain(d)

    // This record doesn't show up as publishable
    const page2 = await pageMain.addOne({
      slug: "/testing/should-never-be-saved-123012301230/123/123/123/",
      status: PageStatusEnum.Draft,
    })

    await sql.upsertOne({
      pageId: page2.data.dataValues.id,
      title: "title",
      description: "description",
      picture: "picture",
      pictureAlt: "pictureAlt",
    })

    const getMany = await sql.getManyPublishable()

    expect(getMany.data.length).toBe(1)
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

