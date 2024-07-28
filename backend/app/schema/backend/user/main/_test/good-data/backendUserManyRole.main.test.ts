import { Model } from "sequelize";
import backendRole from "../../../../../../models/backend/role/backendRole.model";
import makeBackendUserMain from "../../backendUser.main";
import makeBackendRoleMain from "../../../../role/main/backendRole.main";
import makeBackendUserManyRoleMain from "../../backendUserManyRole.main";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import backendUser from "../../../../../../models/backend/user/backendUser.model";
jest.setTimeout(100000)

describe("test backendUserManyRole.main.js", () => {
  let d: dependencies;
  let user: Model<backendUser>;
  let role: Model<backendRole>;

  beforeAll(async () => {

    d = await makeDTestObj()



    const backendUserMain = makeBackendUserMain(d)
    const backendRoleMain = makeBackendRoleMain(d)

    user = (await backendUserMain.addOne({
      email: "asdf@aasdf.com",
      password: "blahBLAH!#@jklN24",
    })).data

    role = (await backendRoleMain.addOne({
      name: "test role"
    })).data

    // const backendUserMain = makeBackendUserMain(d)

  }, 100000)

  test("addOne: can add record.", async () => {
    const userManyRoleMain = makeBackendUserManyRoleMain(d)

    const addOne = await userManyRoleMain.addOne({
      roleId: role.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(addOne.success).toBe(true)
    expect(addOne.data.dataValues.userId).toEqual(user.dataValues.id)
    expect(addOne.data.dataValues.roleId).toEqual(role.dataValues.id)
  })

  test("deleteOne: can delete record.", async () => {
    const userManyRoleMain = makeBackendUserManyRoleMain(d)

    const deleteOne = await userManyRoleMain.deleteOne({
      roleId: role.dataValues.id,
      userId: user.dataValues.id,
    })
    expect(deleteOne.success).toBe(true)
  })

  test("setList: can add many records at once.", async () => {
    const userManyRoleMain = makeBackendUserManyRoleMain(d)

    const setList = await userManyRoleMain.setList(
      [{
        roleId: role.dataValues.id,
        userId: user.dataValues.id,
      }]
    )
    expect(setList.success).toBe(true)
  })

  test("getAll: can get many records at once.", async () => {
    const userManyRoleMain = makeBackendUserManyRoleMain(d)

    const getAll = await userManyRoleMain.getAll({
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

