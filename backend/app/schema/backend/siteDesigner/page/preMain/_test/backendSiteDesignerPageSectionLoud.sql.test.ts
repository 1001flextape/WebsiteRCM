import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageMain from "../../main/backendSiteDesignerPage.main";
import makeBackendSiteDesignerPageSql from "../backendSiteDesignerPage.sql";
import makeBackendSiteDesignerPageSectionLoudSql from "../backendSiteDesignerPageSectionLoud.sql";
jest.setTimeout(100000)


describe("test backendSiteDesignerPageSectionLoud.sql.js", () => {
  let d: dependencies
  let pageId: string
  let record1Id: string

  beforeAll(async () => {

    d = await makeDTestObj()

    const pageSql = makeBackendSiteDesignerPageSql(d)

    const page = await pageSql.addOne({
      slug: "/test/this-is-test/should-not-be-saved",
      status: PageStatusEnum.New,
    })

    pageId = page.data.dataValues.id

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const loud = makeBackendSiteDesignerPageSectionLoudSql(d)

    const upsertOne = await loud.upsertOne({
      pageId,
      author: "author",
      name: "name",
      menuJsonB: JSON.stringify({ testing: "testing" }),
      userAnswersJsonB: JSON.stringify({ testing: "testing" }),
      webAssetImport: "webAssetImport",
      isReady: true,
    })
    record1Id = upsertOne.data.dataValues.id

    expect(upsertOne.data.dataValues.author).toEqual("author")
    expect(upsertOne.data.dataValues.name).toEqual("name")
    expect(upsertOne.data.dataValues.menuJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(upsertOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(upsertOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(upsertOne.data.dataValues.isReady).toBe(true)

  })

  test("getOneById: can get record by id.", async () => {
    const loud = makeBackendSiteDesignerPageSectionLoudSql(d)

    const getOneById = await loud.getOneById({
      id: record1Id,
    })

    expect(getOneById.data.dataValues.menuJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneById.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneById.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(getOneById.data.dataValues.isReady).toBe(true)
  })

  test("getOneByPageId: can get record.", async () => {
    const loud = makeBackendSiteDesignerPageSectionLoudSql(d)

    const getOneByPageId = await loud.getOneByPageId({
      pageId,
    })

    expect(getOneByPageId.data.dataValues.menuJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneByPageId.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneByPageId.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(getOneByPageId.data.dataValues.isReady).toBe(true)
  })

  test("getMany: can get all records.", async () => {
    const pageSql = makeBackendSiteDesignerPageSectionLoudSql(d)

    const getMany = await pageSql.getMany()

    expect(getMany.data.length).toBe(1)
  })

  test("deleteOne: can delete record.", async () => {
    const loud = makeBackendSiteDesignerPageSectionLoudSql(d)

    const deleteOne = await loud.deleteOne({
      id: record1Id,
    })

    expect(deleteOne.success).toBe(true)

    const getOneByPageId = await loud.getOneByPageId({
      pageId,
    })

    expect(getOneByPageId.data).toBeNull()
  })

  test("getManyPublishable: can get all records.", async () => {
    const sql = makeBackendSiteDesignerPageSectionLoudSql(d)
    const pageSql = makeBackendSiteDesignerPageMain(d)

    // this shows up
    const page1 =await pageSql.addOne({
      slug: "/test/this-is-test/should-not-be-saved/2",
      status: PageStatusEnum.New,
    })

    await sql.upsertOne({
      pageId: page1.data.dataValues.id,
      author: "author",
      name: "name",
      menuJsonB: JSON.stringify({ testing: "testing" }),
      userAnswersJsonB: JSON.stringify({ testing: "testing" }),
      webAssetImport: "webAssetImport",
      isReady: true,
    })

    // This record doesn't show up as publishable
    const page2 = await pageSql.addOne({
      slug: "/testing/should-never-be-saved-123012301230/123/123/123/",
      status: PageStatusEnum.Draft,
    })

    await sql.upsertOne({
      pageId: page2.data.dataValues.id,
      author: "author",
      name: "name",
      menuJsonB: JSON.stringify({ testing: "testing" }),
      userAnswersJsonB: JSON.stringify({ testing: "testing" }),
      webAssetImport: "webAssetImport",
      isReady: true,
    })

    const getManyPublishable = await sql.getManyPublishable()

    expect(getManyPublishable.data.length).toBe(1)
  })

  afterAll(async () => {

    await d.dbTransaction.rollback()
  })
})

