import makeBackendPermissionMain from "../../backendPermission.main";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendPermission.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    

  }, 100000)

  test("backendPermission_getOneById_error:0001: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const getOneById = await permissionMain.getOneById({
      id: ""
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("backendPermission_getOneById_error:0001")
  })

  test("backendPermission_getOneById_error:0002: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const getOneById = await permissionMain.getOneById({
      id: "This is a UUID"
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("backendPermission_getOneById_error:0002")
  })

  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})