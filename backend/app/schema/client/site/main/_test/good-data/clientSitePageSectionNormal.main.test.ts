import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSitePageMain from "../../clientSitePage.main"
import makeClientSitePageSectionNormalMain from "../../clientSitePageSectionNormal.main"

jest.setTimeout(100000)


describe("test clientSitePageSectionNormal.main.js", () => {
  let d: dependencies
  let pageId: string
  let record1Id: string

  beforeAll(async () => {

    d = await makeDTestObj()
    
    

    const pageMain = makeClientSitePageMain(d)

    const page = await pageMain.addOne({
      slug: "/test/this-is-test/should-not-be-saved",
    })

    pageId = page.data.dataValues.id

  }, 100000)

  test("addOne: can add record.", async () => {
    const normal = makeClientSitePageSectionNormalMain(d)

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
    const normal = makeClientSitePageSectionNormalMain(d)

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
    const normal = makeClientSitePageSectionNormalMain(d)

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
    const normal = makeClientSitePageSectionNormalMain(d)

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
    const normal = makeClientSitePageSectionNormalMain(d)

    const deleteOne = await normal.deleteOne({
      id: record1Id,
    })

    expect(deleteOne.success).toBe(true)
    
    const getOneById = await normal.getOneById({
      id: record1Id,
    })

    expect(getOneById.data).toBeNull()
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

