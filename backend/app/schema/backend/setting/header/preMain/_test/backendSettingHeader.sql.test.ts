import makeBackendSettingHeaderSql from "../backendSettingHeader.sql"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendSettingHeader.sql.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const header = makeBackendSettingHeaderSql(d)

    const updateOne = await header.upsertOne({
      menuJsonB: JSON.stringify({testing: "testing"}),
      userAnswersJsonB: JSON.stringify({testing: "testing"}),
      webAssetImport: "webAssetImport",
      isReady: true,
    })

    expect(updateOne.data.dataValues.menuJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(updateOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(updateOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(updateOne.data.dataValues.isChanged).toBe(true)
    expect(updateOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const header = makeBackendSettingHeaderSql(d)

    const getOne = await header.getOne()

    expect(getOne.data.dataValues.menuJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(getOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(getOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(getOne.data.dataValues.isChanged).toBe(true)
    expect(getOne.data.dataValues.isReady).toBe(true)
  })

  test("resetIsChanged: remove is changed flag.", async () => {
    const sql = makeBackendSettingHeaderSql(d)

    await sql.resetIsChanged()
    
    const getOne = await sql.getOne()

    expect(getOne.data.dataValues.isChanged).toBe(false)

  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

