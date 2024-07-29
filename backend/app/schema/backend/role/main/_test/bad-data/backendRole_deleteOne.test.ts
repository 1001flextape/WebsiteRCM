import makeBackendRoleMain from "../../backendRole.main";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendRole.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {

    d = await makeDTestObj()
    
    

  }, 100000)

  test("backendRole_deleteOne_error:0001: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const deleteOne = await roleMain.deleteOne({
      id: ""
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRole_deleteOne_error:0001")
  })

  test("backendRole_deleteOne_error:0002: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const deleteOne = await roleMain.deleteOne({
      id: "This is a UUID"
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRole_deleteOne_error:0002")
  })

  test("backendRole_deleteOne_error:0003: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const deleteOne = await roleMain.deleteOne({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e"
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRole_deleteOne_error:0003")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})