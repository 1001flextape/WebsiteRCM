import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSiteFontMain from "../../clientSiteFont.main"
jest.setTimeout(100000)

describe("test clientSiteFont.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const main = makeClientSiteFontMain(d)

    const updateOne = await main.upsertOne({
      font: "font",
    })

    expect(updateOne.data.dataValues.font).toEqual("font")
  })

  test("getOne: can get record.", async () => {
    const main = makeClientSiteFontMain(d)

    const getOne = await main.getOne()

    expect(getOne.data.dataValues.font).toEqual("font")
  })

  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})

