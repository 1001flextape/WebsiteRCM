import makeBackendRoleManyPermissionMain from "../../backendRoleManyPermission.main"
import makeBackendPermissionSql from "../../../../permission/preMain/backendPermission.sql"
import makeBackendRoleMain from "../../backendRole.main"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency"
jest.setTimeout(100000)


describe("test backendRoleManyPermission.main.js", () => {
  let d: dependencies;
  let roleId: string

  let permissionId_1: string
  let permissionId_2: string
  let permissionId_3: string
  let permissionId_4: string

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const roleMain = makeBackendRoleMain(d)
    const permissionSql = makeBackendPermissionSql(d)

    const role = await roleMain.addOne({ name: "test role for roleManyPermission. 1" })
    const permission_1 = await permissionSql.addOne({ name: "test permission for roleManyPermission. 1" })
    const permission_2 = await permissionSql.addOne({ name: "test permission for roleManyPermission. 2" })
    const permission_3 = await permissionSql.addOne({ name: "test permission for roleManyPermission. 3" })
    const permission_4 = await permissionSql.addOne({ name: "test permission for roleManyPermission. 4" })

    roleId = role.data.dataValues.id
    permissionId_1 = permission_1.data.dataValues.id
    permissionId_2 = permission_2.data.dataValues.id
    permissionId_3 = permission_3.data.dataValues.id
    permissionId_4 = permission_4.data.dataValues.id

  }, 100000)

  test("addOne: add one permission to role.", async () => {
    const roleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const addOnePermission = await roleManyPermissionMain.addOne({
      roleId,
      permissionId: permissionId_1,
    })

    expect(addOnePermission.success).toBe(true);
  })

  test("deleteOne: delete one permission from role.", async () => {
    const roleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    //target function
    const deleteOnePermission = await roleManyPermissionMain.deleteOne({
      roleId,
      permissionId: permissionId_1,
    })

    expect(deleteOnePermission.success).toBe(true);
  })

  test("setList: first time.", async () => {
    const roleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const setList = await roleManyPermissionMain.setList([
      {
        roleId,
        permissionId: permissionId_1,
      }
    ])


    expect(setList.success).toBe(true)
  })

  test("getManyByRoleId: setList worked", async () => {
    const roleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const getManyByRoleId = await roleManyPermissionMain.getManyByRoleId({
      roleId,
    })

    expect(getManyByRoleId.success).toBe(true)
    expect(getManyByRoleId.data.length).toBe(1)
  })

  test("setList & getManyByRoleId: can update and get record.", async () => {
    const roleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const getManyByRoleId = await roleManyPermissionMain.getManyByRoleId({
      roleId,
    })

    const newSetData = [

      ...getManyByRoleId.data.map(l => ({
        id: l.dataValues.id,
        permissionId: l.dataValues.permissionId,
        roleId: l.dataValues.roleId,
      })),
      {
        permissionId: permissionId_2,
        roleId: roleId
      },
      {
        permissionId: permissionId_3,
        roleId: roleId
      },
      {
        permissionId: permissionId_4,
        roleId: roleId
      },
    ]

    const setList = await roleManyPermissionMain.setList(newSetData)

    expect(setList.success).toEqual(true)

    const getManyByRoleIdAgain = await roleManyPermissionMain.getManyByRoleId({
      roleId,
    })

    expect(getManyByRoleIdAgain.success).toBe(true)
    expect(getManyByRoleIdAgain.data.length).toBe(4)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

