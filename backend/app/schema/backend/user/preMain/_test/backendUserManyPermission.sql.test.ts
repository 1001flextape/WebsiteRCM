import backendPermission from "../../../../../models/backend/permission/backendPermission.model";
import backendUser from "../../../../../models/backend/user/backendUser.model";
import makeBackendUserManyPermissionSql from "../backendUserManyPermission.sql"
import makeBackendUserSql from "../backendUser.sql"
import makeBackendPermissionSql from "../../../permission/preMain/backendPermission.sql"
import { v4 as uuidv4 } from "uuid"
import { Model } from "sequelize";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendUserManyPermission.sql.js", () => {
  let d: dependencies
  let user: Model<backendUser>
  let permission: Model<backendPermission>

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

    const backendUserSql = makeBackendUserSql(d)
    const backendPermissionSql = makeBackendPermissionSql(d)

    let uuid = uuidv4();

    user = (await backendUserSql.addOne({
      email: "userManyPermission@test.com",
      password: "Password1!",
      isAdmin: true,
    })).data

    permission = (await backendPermissionSql.addOne({
      name: "test permission"
    })).data

    // const backendUserSql = makeBackendUserSql(d)

  }, 100000)

  test("addOne & getOne: backendUserManyPermissions can add record.", async () => {
    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const newUserManyPermission = await userManyPermissionSql.addOne({
      permissionId: permission.dataValues.id,
      userId: user.dataValues.id,
    })
    expect(newUserManyPermission.success).toBe(true)


    const deletedUserManyPermission = await userManyPermissionSql.deleteOne({
      permissionId: permission.dataValues.id,
      userId: user.dataValues.id,
    })
    expect(deletedUserManyPermission.success).toBe(true)
  })

  test("addMany & deleteMany: backendUserManyPermissions can add many records at once.", async () => {
    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const addManyPermission = await userManyPermissionSql.addMany({
      userId: user.dataValues.id,
      permissionIdsArray: [permission.dataValues.id],
    })
    expect(addManyPermission.success).toBe(true)

    const deleteManyPermission = await userManyPermissionSql.deleteMany({
      userId: user.dataValues.id,
      permissionIdsArray: [permission.dataValues.id],
    })
    expect(deleteManyPermission.success).toBe(true)
  })

  afterAll(async () => {
    ;
    await d.dbTransaction.rollback();
  })
})

