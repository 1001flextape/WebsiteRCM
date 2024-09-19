import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSitePageSql from "../clientSitePage.sql"
import makeClientSitePageSectionLoudSql from "../clientSitePageSectionLoud.sql"

jest.setTimeout(100000)


describe("test clientSitePageSectionLoud.sql.js", () => {
  let d: dependencies
  let pageId: string
  let record1Id: string

  beforeAll(async () => {

    d = await makeDTestObj()



    const pageSql = makeClientSitePageSql(d)

    const page = await pageSql.addOne({
      slug: "/test/this-is-test/should-not-be-saved",
    })

    pageId = page.data.dataValues.id

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const loud = makeClientSitePageSectionLoudSql(d)

    const upsertOne = await loud.upsertOne({
      pageId,
      userAnswersJsonB: JSON.stringify({ testing: "testing" }),
      webAssetImport: "webAssetImport",

    })
    record1Id = upsertOne.data.dataValues.id

    expect(upsertOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(upsertOne.data.dataValues.webAssetImport).toEqual("webAssetImport")

  })

  test("getOneById: can get record by id.", async () => {
    const loud = makeClientSitePageSectionLoudSql(d)

    const getOneById = await loud.getOneById({
      id: record1Id,
    })

    expect(getOneById.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneById.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  test("getOneByPageId: can get record.", async () => {
    const loud = makeClientSitePageSectionLoudSql(d)

    const getOneByPageId = await loud.getOneByPageId({
      pageId,
    })

    expect(getOneByPageId.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneByPageId.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  test("deleteOne: can delete record.", async () => {
    const loud = makeClientSitePageSectionLoudSql(d)

    const deleteOne = await loud.deleteOne({
      id: record1Id,
    })

    expect(deleteOne.success).toBe(true)

    const getOneByPageId = await loud.getOneByPageId({
      pageId,
    })

    expect(getOneByPageId.data).toBeNull()
  })

  test("setList: first time.", async () => {
    const pageLoudSectionSql = makeClientSitePageSectionLoudSql(d)

    const setList = await pageLoudSectionSql.setList([
      {
        pageId,

        // permissionId: permissionId_1,
        // roleId: roleId,
      }
    ])


    expect(setList.success).toBe(true)
  })

  test("getOneByPageId: setList worked", async () => {
    const pageLoudSectionSql = makeClientSitePageSectionLoudSql(d)

    const getManyByRoleId = await pageLoudSectionSql.getOneByPageId({
      pageId,
    })

    expect(getManyByRoleId.success).toBe(true)
    expect(getManyByRoleId.data.dataValues.pageId).toBe(pageId)
  })

  test("setList & getOneByPageId: can update and get record.", async () => {
    const pageLoudSectionSql = makeClientSitePageSectionLoudSql(d)
    const pageSql = makeClientSitePageSql(d)

    const page2 = await pageSql.addOne({
      slug: "/asdf/asdf/asdf/test"
    })

    const getManyByRoleId = await pageLoudSectionSql.getOneByPageId({
      pageId,
    })

    const setList = await pageLoudSectionSql.setList([
      { ...getManyByRoleId.data.dataValues },
      {
        pageId: page2.data.dataValues.id,
      }
    ])

    expect(setList.success).toEqual(true)

    const getOneByPageId = await pageLoudSectionSql.getOneByPageId({
      pageId,
    })

    expect(getOneByPageId.success).toBe(true)
    expect(getOneByPageId.data.dataValues.pageId).toBe(pageId)

    const getOneByPageId2 = await pageLoudSectionSql.getOneByPageId({
      pageId: page2.data.dataValues.id,
    })

    expect(getOneByPageId2.success).toBe(true)
    expect(getOneByPageId2.data.dataValues.pageId).toBe(page2.data.dataValues.id)

    //remove page2

    const setListRemovePage2 = await pageLoudSectionSql.setList([
      { ...getManyByRoleId.data.dataValues }
    ])

    expect(setListRemovePage2.success).toEqual(true)

    const getOneByPageIdAgain = await pageLoudSectionSql.getOneByPageId({
      pageId,
    })

    expect(getOneByPageIdAgain.success).toBe(true)
    expect(getOneByPageIdAgain.data.dataValues.pageId).toBe(pageId)

    const getOneByPageId2Again = await pageLoudSectionSql.getOneByPageId({
      pageId: page2.data.dataValues.id,
    })

    expect(getOneByPageId2Again.success).toBe(true)
    expect(getOneByPageId2Again.data).toBe(null)


  })

  afterAll(async () => {

    await d.dbTransaction.rollback()
  })
})

