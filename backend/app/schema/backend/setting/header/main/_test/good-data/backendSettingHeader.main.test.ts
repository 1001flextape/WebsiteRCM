import makeBackendSettingHeaderMain from "../../backendSettingHeader.main"
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { SelectionTypeEnum } from "../../../../../../../models/backend/setting/backendSettingHeader.model";
jest.setTimeout(100000)


describe("test backendSettingHeader.main.js", () => {
  let d: dependencies

  beforeAll(async () => {

    d = await makeDTestObj()
    
    

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const header = makeBackendSettingHeaderMain(d)

    const updateOne = await header.upsertOne({
      userAnswers: JSON.stringify({ testing: "testing" }),
      selectionType: SelectionTypeEnum.BUILT_IN,
      selectionId: "2ec57f1a-f355-48d5-8aa3-a8fc2e457ff4",
      isReady: true,
    })


    expect(updateOne.data.dataValues.menuJsonB).not.toBeNull()
    expect(updateOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(updateOne.data.dataValues.webAssetImport).toEqual("built-in/0/headers/LiteHeader/")
    expect(updateOne.data.dataValues.isChanged).toBe(true)
    expect(updateOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const header = makeBackendSettingHeaderMain(d)

    const getOne = await header.getOne()

    expect(getOne.data.dataValues.menuJsonB).not.toBeNull()
    expect(getOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOne.data.dataValues.webAssetImport).toEqual("built-in/0/headers/LiteHeader/")
    expect(getOne.data.dataValues.isChanged).toBe(true)
    expect(getOne.data.dataValues.isReady).toBe(true)
  })

  test("resetIsChanged: remove is changed flag.", async () => {
    const main = makeBackendSettingHeaderMain(d)

    await main.resetIsChanged()
    
    const getOne = await main.getOne()

    expect(getOne.data.dataValues.isChanged).toBe(false)

  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

