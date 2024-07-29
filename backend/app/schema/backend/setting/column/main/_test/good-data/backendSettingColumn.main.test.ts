import makeBackendSettingColumnMain from "../../backendSettingColumn.main"
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendSettingColumn.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const settingColumn = makeBackendSettingColumnMain(d)

    const upsertOne = await settingColumn.upsertOne({
      width: "width",
      isChanged: true,
      isReady: true,
    })

    expect(upsertOne.data.dataValues.width).toEqual("width")
    expect(upsertOne.data.dataValues.isChanged).toEqual(true)
    expect(upsertOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const settingColumn = makeBackendSettingColumnMain(d)

    const getOne = await settingColumn.getOne()

    expect(getOne.data.dataValues.width).toEqual("width")
    expect(getOne.data.dataValues.isChanged).toEqual(true)
    expect(getOne.data.dataValues.isReady).toBe(true)
  })

  test("resetIsChanged: remove is changed flag.", async () => {
    const settingColumn = makeBackendSettingColumnMain(d)

    await settingColumn.resetIsChanged()
    
    const getOne = await settingColumn.getOne()

    expect(getOne.data.dataValues.isChanged).toBe(false)

  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

