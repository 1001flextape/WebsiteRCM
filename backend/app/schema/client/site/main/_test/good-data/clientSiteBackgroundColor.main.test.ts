import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSiteBackgroundColorMain from "../../clientSiteBackgroundColor.main"

jest.setTimeout(100000)


describe("test clientSiteBackgroundColor.main.js", () => {
  let d: dependencies

  beforeAll(async () => {

    d = await makeDTestObj()

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const main = makeClientSiteBackgroundColorMain(d)

    const updateOne = await main.upsertOne({
      backgroundColor_day: "backgroundColor_day",
      backgroundColor_night: "backgroundColor_night",

    })

    expect(updateOne.data.dataValues.backgroundColor_day).toEqual("backgroundColor_day")
    expect(updateOne.data.dataValues.backgroundColor_night).toEqual("backgroundColor_night")

  })

  test("getOne: can get record.", async () => {
    const main = makeClientSiteBackgroundColorMain(d)

    const getOne = await main.getOne()

    expect(getOne.data.dataValues.backgroundColor_day).toEqual("backgroundColor_day")
    expect(getOne.data.dataValues.backgroundColor_night).toEqual("backgroundColor_night")
  })

  afterAll(async () => {

    await d.dbTransaction.rollback()
  })
})

