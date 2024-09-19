import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSiteColumnMain from "../../clientSiteColumn.main"
jest.setTimeout(100000)

describe("test clientSiteColumn.main.js", () => {
  let d: dependencies

  beforeAll(async () => {

    d = await makeDTestObj()

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const main = makeClientSiteColumnMain(d)

    const updateOne = await main.upsertOne({
      width: "width",
    })

    expect(updateOne.data.dataValues.width).toEqual("width")

  })

  test("getOne: can get record.", async () => {
    const main = makeClientSiteColumnMain(d)

    const getOne = await main.getOne()

    expect(getOne.data.dataValues.width).toEqual("width")
  })

  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})