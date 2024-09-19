import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeClientSiteBackgroundColorSql from "../clientSiteBackgroundColor.sql";
import makeClientSiteBrowserSql from "../clientSiteBrowser.sql";
jest.setTimeout(100000)

describe("test clientSiteBackgroundColor.sql.js", () => {
  let d: dependencies

  beforeAll(async () => {

    d = await makeDTestObj()

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const settingBackgroundColor = makeClientSiteBackgroundColorSql(d)

    const upsertOne = await settingBackgroundColor.upsertOne({
      backgroundColor_day: "backgroundColor_day",
      backgroundColor_night: "backgroundColor_night",
    })

    expect(upsertOne.data.dataValues.backgroundColor_day).toEqual("backgroundColor_day")
    expect(upsertOne.data.dataValues.backgroundColor_night).toEqual("backgroundColor_night")

  })

  test("getOne: can get record.", async () => {
    const settingBackgroundColor = makeClientSiteBackgroundColorSql(d)

    const getOne = await settingBackgroundColor.getOne()

    expect(getOne.data.dataValues.backgroundColor_day).toEqual("backgroundColor_day")
    expect(getOne.data.dataValues.backgroundColor_night).toEqual("backgroundColor_night")
  })

  afterAll(async () => {

    await d.dbTransaction.rollback()
  })
})

