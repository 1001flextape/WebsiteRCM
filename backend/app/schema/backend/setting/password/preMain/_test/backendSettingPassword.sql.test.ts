import makeFoundationSettingPassword from "../backendSettingPassword.sql"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSettingPassword.sql.js", () => {
  let d: dependencies;

  beforeAll(async () => {
    
    d = await makeDTestObj()

  }, 100000)

  test("upsertOne: can add record.", async () => {
    const settingPassword = makeFoundationSettingPassword(d)

    const updateOne = await settingPassword.upsertOne({
      passwordLength: 8,
      shouldHaveLowercaseLetter: false,
      shouldHaveNumber: false,
      shouldHaveSymbol: false,
      shouldHaveUppercaseLetter: false,
    })
    expect(updateOne.data.dataValues.passwordLength).toEqual(8)
    expect(updateOne.data.dataValues.shouldHaveLowercaseLetter).toBe(false)
    expect(updateOne.data.dataValues.shouldHaveNumber).toBe(false)
    expect(updateOne.data.dataValues.shouldHaveSymbol).toBe(false)
    expect(updateOne.data.dataValues.shouldHaveUppercaseLetter).toBe(false)
  })

  test("getOne: can add record.", async () => {
    const settingPassword = makeFoundationSettingPassword(d)

    const getOne = await settingPassword.getOne()
    expect(getOne.data.dataValues.passwordLength).toEqual(8)
  })
  
  afterAll(async () => {
    d.dbTransaction.rollback();
  })
})

