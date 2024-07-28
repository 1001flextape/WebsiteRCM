import makeBackendRoleMain from "../../backendRole.main";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("backendRole_addOne_error:0001: works", async () => {
    const backendRoleMain = makeBackendRoleMain(d)

    const addOne = await backendRoleMain.addOne({
      name: null
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRole_addOne_error:0001")
  })

  test("backendRole_addOne_error:0002: works", async () => {
    const backendRoleMain = makeBackendRoleMain(d)

    const addOne = await backendRoleMain.addOne({
      name: "12345678901234567890123456789012345678901234567890 - blah"
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRole_addOne_error:0002")
  })

  test("backendRole_addOne_error:0003: works", async () => {
    const backendRoleMain = makeBackendRoleMain(d)

    await backendRoleMain.addOne({
      name: "testing name is taken."
    })

    const addOne = await backendRoleMain.addOne({
      name: "testing name is taken.",
    })
    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRole_addOne_error:0003")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})