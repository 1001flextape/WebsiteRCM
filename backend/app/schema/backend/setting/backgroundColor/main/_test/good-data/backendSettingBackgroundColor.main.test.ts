import makeBackendSettingBackgroundColorMain from "../../backendSettingBackgroundColor.main"
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendSettingBackgroundColor.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const settingBackgroundColor = makeBackendSettingBackgroundColorMain(d)

    const upsertOne = await settingBackgroundColor.upsertOne({
      backgroundColor_day: "backgroundColor_day",
      backgroundColor_night: "backgroundColor_night",
      isChanged: true,
      isReady: true,

    })

    expect(upsertOne.data.dataValues.backgroundColor_day).toEqual("backgroundColor_day")
    expect(upsertOne.data.dataValues.backgroundColor_night).toEqual("backgroundColor_night")
    expect(upsertOne.data.dataValues.isChanged).toBe(true)
    expect(upsertOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const settingBackgroundColor = makeBackendSettingBackgroundColorMain(d)

    const getOne = await settingBackgroundColor.getOne()

    expect(getOne.data.dataValues.backgroundColor_day).toEqual("backgroundColor_day")
    expect(getOne.data.dataValues.backgroundColor_night).toEqual("backgroundColor_night")
    expect(getOne.data.dataValues.isChanged).toBe(true)
    expect(getOne.data.dataValues.isReady).toBe(true)

  })

  test("resetIsChanged: remove is changed flag.", async () => {
    const settingBackgroundColor = makeBackendSettingBackgroundColorMain(d)

    await settingBackgroundColor.resetIsChanged()
    
    const getOne = await settingBackgroundColor.getOne()

    expect(getOne.data.dataValues.isChanged).toBe(false)

  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

