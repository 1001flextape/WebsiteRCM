import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeClientSiteColumnSql from "../clientSiteColumn.sql";
jest.setTimeout(100000)

describe("test clientSiteColumn.sql.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const sql = makeClientSiteColumnSql(d)

    const updateOne = await sql.upsertOne({
      width: "width",
    })

    expect(updateOne.data.dataValues.width).toEqual("width")

  })

  test("getOne: can get record.", async () => {
    const sql = makeClientSiteColumnSql(d)

    const getOne = await sql.getOne()

    expect(getOne.data.dataValues.width).toEqual("width")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

