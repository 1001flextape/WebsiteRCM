import { Model } from "sequelize";
import backendPermission from "../../../../../models/backend/permission/backendPermission.model";
import makeBackendUserSql from "../backendUser.sql";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import backendUser from "../../../../../models/backend/user/backendUser.model";
import makeBackendPermissionSql from "../../../permission/preMain/backendPermission.sql";
import makeBackendUserManyPermissionSql from "../backendUserManyPermission.sql";
jest.setTimeout(100000)

describe("test backendUserManyPermission.sql.js", () => {
  let d: dependencies;
  let user: Model<backendUser>;
  let permission: Model<backendPermission>;

  beforeAll(async () => {

    d = await makeDTestObj()

    const backendUserSql = makeBackendUserSql(d)
    const backendPermissionSql = makeBackendPermissionSql(d)

    user = (await backendUserSql.addOne({
      email: "asdf@aasdf.com",
      password: "blahBLAH!#@jklN24",
    })).data

    permission = (await backendPermissionSql.addOne({
      name: "test permission"
    })).data

    // const backendUserSql = makeBackendUserSql(d)

  }, 100000)

  test("addOne: can add record.", async () => {
    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const addOne = await userManyPermissionSql.addOne({
      permissionId: permission.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(addOne.success).toBe(true)
    expect(addOne.data.dataValues.userId).toEqual(user.dataValues.id)
    expect(addOne.data.dataValues.permissionId).toEqual(permission.dataValues.id)
  })

  test("deleteOne: can delete record.", async () => {
    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const deleteOne = await userManyPermissionSql.deleteOne({
      permissionId: permission.dataValues.id,
      userId: user.dataValues.id,
    })
    expect(deleteOne.success).toBe(true)
  })

  test("setList: can add many records at once.", async () => {
    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const setList = await userManyPermissionSql.setList(
      [{
        permissionId: permission.dataValues.id,
        userId: user.dataValues.id,
      }]
    )
    expect(setList.success).toBe(true)
  })

  test("getAll: can get many records at once.", async () => {
    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const getAll = await userManyPermissionSql.getAll({
      userId: user.dataValues.id,
    }

    )
    expect(getAll.success).toBe(true)
    expect(getAll.data[0].dataValues.userId).toEqual(user.dataValues.id)
    expect(getAll.data[0].dataValues.permissionId).toEqual(permission.dataValues.id)
    expect(getAll.data.length).toBe(1)
  })

  afterAll(async () => {
    await d.dbTransaction.rollback();
    ;
  })
})

