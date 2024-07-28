import makeBackendRoleMain from "../../backendRole.main";
import makeBackendRoleManyPermissionMain from "../../backendRoleManyPermission.main";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: dependencies
  let roleId: string

  beforeAll(async () => {
    
    d = await makeDTestObj()
    

    const roleMain = makeBackendRoleMain(d)

    const role = await roleMain.addOne({ name: "test role for roleManyPermission. 1" })

    roleId = role.data.dataValues.id

  }, 100000)

  test("backendRoleManyPermission_getManyByRoleId_error:0001: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const getManyByRoleId = await backendRoleManyPermissionMain.getManyByRoleId({
      roleId: null,
    })

    expect(getManyByRoleId.success).toBe(false)
    expect(getManyByRoleId.errorIdentifier).toEqual("backendRoleManyPermission_getManyByRoleId_error:0001")
  })

  test("backendRoleManyPermission_getManyByRoleId_error:0002: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const getManyByRoleId = await backendRoleManyPermissionMain.getManyByRoleId({
      roleId: "I am a UUID",
    })

    expect(getManyByRoleId.success).toBe(false)
    expect(getManyByRoleId.errorIdentifier).toEqual("backendRoleManyPermission_getManyByRoleId_error:0002")
  })

  test("backendRoleManyPermission_getManyByRoleId_error:0003: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const getManyByRoleId = await backendRoleManyPermissionMain.getManyByRoleId({
      roleId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(getManyByRoleId.success).toBe(false)
    expect(getManyByRoleId.errorIdentifier).toEqual("backendRoleManyPermission_getManyByRoleId_error:0003")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})