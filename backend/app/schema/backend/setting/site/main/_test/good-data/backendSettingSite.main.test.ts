import makeBackendSettingSiteMain from "../../backendSettingSite.main"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSettingSite.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const settingSite = makeBackendSettingSiteMain(d)

    const updateOne = await settingSite.upsertOne({
      favicon: "favicon",
      tab: "tab",
      isReady: true,

    })

    expect(updateOne.data.dataValues.favicon).toEqual("favicon")
    expect(updateOne.data.dataValues.tab).toEqual("tab")
    expect(updateOne.data.dataValues.isChanged).toBe(true)
    expect(updateOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const settingSite = makeBackendSettingSiteMain(d)

    const getOne = await settingSite.getOne()

    expect(getOne.data.dataValues.favicon).toEqual("favicon")
    expect(getOne.data.dataValues.tab).toEqual("tab")
    expect(getOne.data.dataValues.isChanged).toBe(true)
    expect(getOne.data.dataValues.isReady).toBe(true)
  })

  test("resetIsChanged: remove is changed flag.", async () => {
    const main = makeBackendSettingSiteMain(d)

    await main.resetIsChanged()
    
    const getOne = await main.getOne()

    expect(getOne.data.dataValues.isChanged).toBe(false)

  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

