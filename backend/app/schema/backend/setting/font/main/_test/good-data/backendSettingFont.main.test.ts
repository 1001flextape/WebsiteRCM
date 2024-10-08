import makeBackendSettingFontMain from "../../backendSettingFont.main"
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendSettingFont.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const settingFont = makeBackendSettingFontMain(d)

    const updateOne = await settingFont.upsertOne({
      font: "font",
      isChanged: true,
      isReady: true,
    })

    expect(updateOne.data.dataValues.font).toEqual("font")
    expect(updateOne.data.dataValues.isChanged).toBe(true)
    expect(updateOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const settingFont = makeBackendSettingFontMain(d)

    const getOne = await settingFont.getOne()

    expect(getOne.data.dataValues.font).toEqual("font")
    expect(getOne.data.dataValues.isChanged).toBe(true)
    expect(getOne.data.dataValues.isReady).toBe(true)

  })

  test("resetIsChanged: remove is changed flag.", async () => {
    const settingFont = makeBackendSettingFontMain(d)

    await settingFont.resetIsChanged()
    
    const getOne = await settingFont.getOne()

    expect(getOne.data.dataValues.isChanged).toBe(false)

  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

