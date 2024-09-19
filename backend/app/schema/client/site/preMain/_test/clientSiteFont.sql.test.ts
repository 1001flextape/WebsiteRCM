import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeClientSiteFontSql from "../clientSiteFont.sql";
jest.setTimeout(100000)

describe("test clientSiteFont.sql.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const sql = makeClientSiteFontSql(d)

    const updateOne = await sql.upsertOne({
      font: "font",
    })

    expect(updateOne.data.dataValues.font).toEqual("font")
  })

  test("getOne: can get record.", async () => {
    const sql = makeClientSiteFontSql(d)

    const getOne = await sql.getOne()

    expect(getOne.data.dataValues.font).toEqual("font")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

