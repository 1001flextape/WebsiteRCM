import makeBackendPermissionMain from "../../../../permission/main/backendPermission.main";
import makeBackendRoleMain from "../../backendRole.main";
import makeBackendRoleManyPermissionMain from "../../backendRoleManyPermission.main";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: dependencies
  let roleId: string

  let permissionId_1: string

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

    const roleMain = makeBackendRoleMain(d)
    const permissionMain = makeBackendPermissionMain(d)
    const roleManyPermissionMain = makeBackendRoleManyPermissionMain(d);

    const role = await roleMain.addOne({ name: "test role for roleManyPermission. 1" })
    const permission_1 = await permissionMain.addOne({ name: "test permission for roleManyPermission. 1" })

    roleId = role.data.dataValues.id
    permissionId_1 = permission_1.data.dataValues.id

    //to throw error0007
    await roleManyPermissionMain.addOne({
      roleId,
      permissionId: permissionId_1,
    })
  }, 100000)

  test("backendRoleManyPermission_addOne_error:0001: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const addOne = await backendRoleManyPermissionMain.addOne({
      roleId: null,
      permissionId: null,
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRoleManyPermission_addOne_error:0001")
  })

  test("backendRoleManyPermission_addOne_error:0002: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const addOne = await backendRoleManyPermissionMain.addOne({
      roleId: null,
      permissionId: "I am a UUID"
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRoleManyPermission_addOne_error:0002")
  })

  test("backendRoleManyPermission_addOne_error:0003: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const addOne = await backendRoleManyPermissionMain.addOne({
      roleId: null,
      permissionId: permissionId_1,
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRoleManyPermission_addOne_error:0003")
  })

  test("backendRoleManyPermission_addOne_error:0004: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const addOne = await backendRoleManyPermissionMain.addOne({
      roleId: "I am a UUID",
      permissionId: permissionId_1,
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRoleManyPermission_addOne_error:0004")
  })

  test("backendRoleManyPermission_addOne_error:0005: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const addOne = await backendRoleManyPermissionMain.addOne({
      roleId,
      permissionId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRoleManyPermission_addOne_error:0005")
  })

  test("backendRoleManyPermission_addOne_error:0006: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const addOne = await backendRoleManyPermissionMain.addOne({
      roleId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
      permissionId: permissionId_1,
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRoleManyPermission_addOne_error:0006")
  })

  test("backendRoleManyPermission_addOne_error:0007: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const addOne = await backendRoleManyPermissionMain.addOne({
      roleId,
      permissionId: permissionId_1,
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRoleManyPermission_addOne_error:0007")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})