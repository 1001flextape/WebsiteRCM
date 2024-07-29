import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSiteBrowserMain from "../../clientSiteBrowser.main"

jest.setTimeout(100000)


describe("test clientSiteBrowser.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const settingSite = makeClientSiteBrowserMain(d)

    const updateOne = await settingSite.upsertOne({
      favicon: "favicon",
      tab: "tab",

    })

    expect(updateOne.data.dataValues.favicon).toEqual("favicon")
    expect(updateOne.data.dataValues.tab).toEqual("tab")

  })

  test("getOne: can get record.", async () => {
    const settingSite = makeClientSiteBrowserMain(d)

    const getOne = await settingSite.getOne()

    expect(getOne.data.dataValues.favicon).toEqual("favicon")
    expect(getOne.data.dataValues.tab).toEqual("tab")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

