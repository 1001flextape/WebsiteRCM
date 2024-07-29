import { Model } from "sequelize";
import backendRole from "../../../../../models/backend/role/backendRole.model";
import makeBackendUserSql from "../backendUser.sql";
import makeBackendUserManyRoleSql from "../backendUserManyRole.sql";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import backendUser from "../../../../../models/backend/user/backendUser.model";
import makeBackendRoleSql from "../../../role/preMain/backendRole.sql";
jest.setTimeout(100000)

describe("test backendUserManyRole.sql.js", () => {
  let d: dependencies;
  let user: Model<backendUser>;
  let role: Model<backendRole>;

  beforeAll(async () => {

    d = await makeDTestObj()



    const backendUserSql = makeBackendUserSql(d)
    const backendRoleSql = makeBackendRoleSql(d)

    user = (await backendUserSql.addOne({
      email: "asdf@aasdf.com",
      password: "blahBLAH!#@jklN24",
    })).data

    role = (await backendRoleSql.addOne({
      name: "test role"
    })).data

    // const backendUserSql = makeBackendUserSql(d)

  }, 100000)

  test("addOne: can add record.", async () => {
    const userManyRoleSql = makeBackendUserManyRoleSql(d)

    const addOne = await userManyRoleSql.addOne({
      roleId: role.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(addOne.success).toBe(true)
    expect(addOne.data.dataValues.userId).toEqual(user.dataValues.id)
    expect(addOne.data.dataValues.roleId).toEqual(role.dataValues.id)
  })

  test("deleteOne: can delete record.", async () => {
    const userManyRoleSql = makeBackendUserManyRoleSql(d)

    const deleteOne = await userManyRoleSql.deleteOne({
      roleId: role.dataValues.id,
      userId: user.dataValues.id,
    })
    expect(deleteOne.success).toBe(true)
  })

  test("setList: can add many records at once.", async () => {
    const userManyRoleSql = makeBackendUserManyRoleSql(d)

    const setList = await userManyRoleSql.setList(
      [{
        roleId: role.dataValues.id,
        userId: user.dataValues.id,
      }]
    )
    expect(setList.success).toBe(true)
  })

  test("getAll: can get many records at once.", async () => {
    const userManyRoleSql = makeBackendUserManyRoleSql(d)

    const getAll = await userManyRoleSql.getAll({
      userId: user.dataValues.id,
    }

    )
    expect(getAll.success).toBe(true)
    expect(getAll.data[0].dataValues.userId).toEqual(user.dataValues.id)
    expect(getAll.data[0].dataValues.roleId).toEqual(role.dataValues.id)
    expect(getAll.data.length).toBe(1)
  })

  afterAll(async () => {
    await d.dbTransaction.rollback();
    ;
  })
})

