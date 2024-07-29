import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSiteFooterSql from "../clientSiteFooter.sql"

jest.setTimeout(100000)


describe("test clientSiteFooter.sql.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const footer = makeClientSiteFooterSql(d)

    const updateOne = await footer.upsertOne({
      userAnswersJsonB: JSON.stringify({testing: "testing"}),
      webAssetImport: "webAssetImport",
    })

    expect(updateOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(updateOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  test("getOne: can get record.", async () => {
    const footer = makeClientSiteFooterSql(d)

    const getOne = await footer.getOne()

    expect(getOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(getOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

