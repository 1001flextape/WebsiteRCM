import makeBackendRoleMain from "../../backendRole.main";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendRole.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("backendRole_getOneById_error:0001: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const getOneById = await roleMain.getOneById({
      id: ""
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("backendRole_getOneById_error:0001")
  })

  test("backendRole_getOneById_error:0002: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const getOneById = await roleMain.getOneById({
      id: "This is a UUID"
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("backendRole_getOneById_error:0002")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})