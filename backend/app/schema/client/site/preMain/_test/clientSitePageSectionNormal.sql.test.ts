import { SelectionTypeEnum } from "../../../../../models/backend/setting/backendSettingHeader.model"
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSitePageSql from "../clientSitePage.sql"
import makeClientSitePageSectionNormalSql from "../clientSitePageSectionNormal.sql"

jest.setTimeout(100000)


describe("test clientSitePageSectionNormal.sql.js", () => {
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

  test("addOne: can add record.", async () => {
    const normal = makeClientSitePageSectionNormalSql(d)

    const addOne = await normal.addOne({
      pageId,
      selectionId: "1ce59109-a2fb-4aef-b923-6d9c4c2fcbda",
      selectionType: SelectionTypeEnum.BUILT_IN,
      orderNumber: 1,
      userAnswersJsonB: JSON.stringify({ testing: "testing" }),
      webAssetImport: "webAssetImport",
    })
    record1Id = addOne.data.dataValues.id

    expect(addOne.data.dataValues.selectionId).toEqual("1ce59109-a2fb-4aef-b923-6d9c4c2fcbda")
    expect(addOne.data.dataValues.selectionType).toEqual(SelectionTypeEnum.BUILT_IN)
    expect(addOne.data.dataValues.orderNumber).toEqual(1)
    expect(addOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(addOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  test("getOneByPageId: can get record.", async () => {
    const normal = makeClientSitePageSectionNormalSql(d)

    const getOneById = await normal.getOneById({
      id: record1Id,
    })

    expect(getOneById.data.dataValues.selectionId).toEqual("1ce59109-a2fb-4aef-b923-6d9c4c2fcbda")
    expect(getOneById.data.dataValues.selectionType).toEqual(SelectionTypeEnum.BUILT_IN)
    expect(getOneById.data.dataValues.orderNumber).toEqual(1)
    expect(getOneById.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneById.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  test("getOneByPageId: can get record.", async () => {
    const normal = makeClientSitePageSectionNormalSql(d)

    const getManyByPageId = await normal.getManyByPageId({
      pageId,
    })

    expect(getManyByPageId.data[0].dataValues.selectionId).toEqual("1ce59109-a2fb-4aef-b923-6d9c4c2fcbda")
    expect(getManyByPageId.data[0].dataValues.selectionType).toEqual(SelectionTypeEnum.BUILT_IN)
    expect(getManyByPageId.data[0].dataValues.orderNumber).toEqual(1)
    expect(getManyByPageId.data[0].dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getManyByPageId.data[0].dataValues.webAssetImport).toEqual("webAssetImport")
  })


  test("updateOne: can add record.", async () => {
    const normal = makeClientSitePageSectionNormalSql(d)

    const updateOne = await normal.updateOne({
      id: record1Id,
      selectionId: "d20bbe57-8593-40d6-ac21-2c908b94bd98",
      selectionType: SelectionTypeEnum.MARKET,
      orderNumber: 2,
      userAnswersJsonB: JSON.stringify({ testing: "testing3" }),
      webAssetImport: "webAssetImport2",
    })

    expect(updateOne.data.dataValues.selectionId).toEqual("d20bbe57-8593-40d6-ac21-2c908b94bd98")
    expect(updateOne.data.dataValues.selectionType).toEqual(SelectionTypeEnum.MARKET)
    expect(updateOne.data.dataValues.orderNumber).toEqual(2)
    expect(updateOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing3" }))
    expect(updateOne.data.dataValues.webAssetImport).toEqual("webAssetImport2")


    const getOneById = await normal.getOneById({
      id: record1Id,
    })

    expect(getOneById.data.dataValues.selectionId).toEqual("d20bbe57-8593-40d6-ac21-2c908b94bd98")
    expect(getOneById.data.dataValues.selectionType).toEqual(SelectionTypeEnum.MARKET)
    expect(getOneById.data.dataValues.orderNumber).toEqual(2)
    expect(getOneById.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing3" }))
    expect(getOneById.data.dataValues.webAssetImport).toEqual("webAssetImport2")
  })

  test("deleteOne: can delete record.", async () => {
    const normal = makeClientSitePageSectionNormalSql(d)

    const deleteOne = await normal.deleteOne({
      id: record1Id,
    })

    expect(deleteOne.success).toBe(true)

    const getOneById = await normal.getOneById({
      id: record1Id,
    })

    expect(getOneById.data).toBeNull()
  })

  test("setList: first time.", async () => {
    const pageNormalSectionSql = makeClientSitePageSectionNormalSql(d)

    const setList = await pageNormalSectionSql.setList([
      {
        pageId,

        // permissionId: permissionId_1,
        // roleId: roleId,
      }
    ])


    expect(setList.success).toBe(true)
  })

  test("getOneByPageId: setList worked", async () => {
    const pageNormalSectionSql = makeClientSitePageSectionNormalSql(d)

    const getManyByRoleId = await pageNormalSectionSql.getManyByPageId({
      pageId,
    })

    expect(getManyByRoleId.success).toBe(true)
    expect(getManyByRoleId.data[0].dataValues.pageId).toBe(pageId)
  })

  test("setList & getOneByPageId: can update and get record.", async () => {
    const pageNormalSectionSql = makeClientSitePageSectionNormalSql(d)
    const pageSql = makeClientSitePageSql(d)

    const page2 = await pageSql.addOne({
      slug: "/asdf/asdf/asdf/test"
    })

    const getManyByRoleId = await pageNormalSectionSql.getManyByPageId({
      pageId,
    })

    const setList = await pageNormalSectionSql.setList([
      { ...getManyByRoleId.data[0].dataValues },
      {
        pageId: page2.data.dataValues.id,
      },
      {
        pageId: page2.data.dataValues.id,
      }
    ])

    expect(setList.success).toEqual(true)

    const getOneByPageId = await pageNormalSectionSql.getManyByPageId({
      pageId,
    })

    expect(getOneByPageId.success).toBe(true)
    expect(getOneByPageId.data[0].dataValues.pageId).toBe(pageId)
    expect(getOneByPageId.data.length).toBe(1)

    const getOneByPageId2 = await pageNormalSectionSql.getManyByPageId({
      pageId: page2.data.dataValues.id,
    })

    expect(getOneByPageId2.success).toBe(true)
    expect(getOneByPageId2.data[0].dataValues.pageId).toBe(page2.data.dataValues.id)
    expect(getOneByPageId2.data[1].dataValues.pageId).toBe(page2.data.dataValues.id)
    expect(getOneByPageId2.data.length).toBe(2)

    //remove page2

    const setListRemovePage2 = await pageNormalSectionSql.setList([
      { ...getManyByRoleId.data[0].dataValues }
    ])

    expect(setListRemovePage2.success).toEqual(true)

    const getOneByPageIdAgain = await pageNormalSectionSql.getManyByPageId({
      pageId,
    })

    expect(getOneByPageIdAgain.success).toBe(true)
    expect(getOneByPageIdAgain.data[0].dataValues.pageId).toBe(pageId)
    expect(getOneByPageIdAgain.data.length).toBe(1)

    const getOneByPageIdAgain2 = await pageNormalSectionSql.getManyByPageId({
      pageId: page2.data.dataValues.id,
    })

    expect(getOneByPageIdAgain2.success).toBe(true)
    expect(getOneByPageIdAgain2.data.length).toBe(0)

  })

  afterAll(async () => {

    await d.dbTransaction.rollback()
  })
})

