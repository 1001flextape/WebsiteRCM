import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSettingHeaderBuiltInMain from "../../backendSettingHeaderBuiltIn.main";
jest.setTimeout(100000)

// ================================================================
// this datatable is seeded


describe("test backendSettingHeaderBuiltIn.main.js", () => {
  let d: dependencies
  let seedId = "2ec57f1a-f355-48d5-8aa3-a8fc2e457ff4"

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("getMany: can get many records.", async () => {
    const settingHeaderBuiltIn = makeBackendSettingHeaderBuiltInMain(d)

    const getMany = await settingHeaderBuiltIn.getMany()

    expect(getMany.data.length).toBeGreaterThan(0)
  })

  test("getOneById: can get one record.", async () => {
    const settingHeaderBuiltIn = makeBackendSettingHeaderBuiltInMain(d)

    const getOneById = await settingHeaderBuiltIn.getOneById({
      id: seedId,
    })

    expect(getOneById.data.dataValues.id).toEqual(seedId)
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

