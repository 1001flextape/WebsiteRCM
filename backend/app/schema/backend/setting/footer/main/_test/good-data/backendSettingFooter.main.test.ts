import makeBackendSettingFooterMain from "../../backendSettingFooter.main"
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { SelectionTypeEnum } from "../../../../../../../models/backend/setting/backendSettingHeader.model";
jest.setTimeout(100000)


describe("test backendSettingFooter.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const footer = makeBackendSettingFooterMain(d)

    const updateOne = await footer.upsertOne({
      userAnswers: JSON.stringify({ testing: "testing" }),
      selectionType: SelectionTypeEnum.BUILT_IN,
      selectionId: "5ce91223-9685-4ee7-93c2-6e38bae8804f",
      isReady: true,
    })

    
    expect(updateOne.data.dataValues.menuJsonB).not.toBeNull()
    expect(updateOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(updateOne.data.dataValues.webAssetImport).toEqual("built-in/0/footers/LiteFooter/")
    expect(updateOne.data.dataValues.isChanged).toBe(true)
    expect(updateOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const footer = makeBackendSettingFooterMain(d)

    const getOne = await footer.getOne()

    expect(getOne.data.dataValues.menuJsonB).not.toBeNull()
    expect(getOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(getOne.data.dataValues.webAssetImport).toEqual("built-in/0/footers/LiteFooter/")
    expect(getOne.data.dataValues.isChanged).toBe(true)
    expect(getOne.data.dataValues.isReady).toBe(true)
  })

  test("resetIsChanged: remove is changed flag.", async () => {
    const main = makeBackendSettingFooterMain(d)

    await main.resetIsChanged()
    
    const getOne = await main.getOne()

    expect(getOne.data.dataValues.isChanged).toBe(false)

  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

