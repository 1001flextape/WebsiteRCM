import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageSectionLoudBuiltInMain from "../../backendSiteDesignerPageSectionLoudBuiltIn.main";
jest.setTimeout(100000)

// ================================================================
// this datatable is seeded


describe("test backendSiteDesignerPageSectionLoudBuiltIn.main.js", () => {
  let d: dependencies
  let seedId = "a3cf9afa-262a-4c82-b290-f35e6eafca9d"

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("getMany: can get many records.", async () => {
    const settingHeaderBuiltIn = makeBackendSiteDesignerPageSectionLoudBuiltInMain(d)

    const getMany = await settingHeaderBuiltIn.getMany()

    expect(getMany.data.length).toBeGreaterThan(0)
  })

  test("getOneById: can get one record.", async () => {
    const settingHeaderBuiltIn = makeBackendSiteDesignerPageSectionLoudBuiltInMain(d)

    const getOneById = await settingHeaderBuiltIn.getOneById({
      id: seedId,
    })

    expect(getOneById.data.dataValues.id).toEqual(seedId)
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

