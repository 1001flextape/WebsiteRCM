import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeClientSiteBrowserSql from "../clientSiteBrowser.sql";
jest.setTimeout(100000)

describe("test clientSiteBrowser.sql.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const settingSite = makeClientSiteBrowserSql(d)

    const updateOne = await settingSite.upsertOne({
      favicon: "favicon",
      tab: "tab",
    })

    expect(updateOne.data.dataValues.favicon).toEqual("favicon")
    expect(updateOne.data.dataValues.tab).toEqual("tab")

  })

  test("getOne: can get record.", async () => {
    const settingSite = makeClientSiteBrowserSql(d)

    const getOne = await settingSite.getOne()

    expect(getOne.data.dataValues.favicon).toEqual("favicon")
    expect(getOne.data.dataValues.tab).toEqual("tab")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

