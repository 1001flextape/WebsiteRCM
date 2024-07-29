import { Model } from "sequelize";
import backendPermission from "../../../../../../models/backend/permission/backendPermission.model";
import makeBackendUserMain from "../../backendUser.main";
import makeBackendPermissionMain from "../../../../permission/main/backendPermission.main";
import makeBackendUserManyPermissionMain from "../../backendUserManyPermission.main";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import backendUser from "../../../../../../models/backend/user/backendUser.model";
jest.setTimeout(100000)

describe("test backendUserManyPermission.main.js", () => {
  let d: dependencies;
  let user: Model<backendUser>;
  let permission: Model<backendPermission>;

  beforeAll(async () => {

    d = await makeDTestObj()

    const backendUserMain = makeBackendUserMain(d)
    const backendPermissionMain = makeBackendPermissionMain(d)

    user = (await backendUserMain.addOne({
      email: "asdf@aasdf.com",
      password: "blahBLAH!#@jklN24",
    })).data

    permission = (await backendPermissionMain.addOne({
      name: "test permission"
    })).data

    // const backendUserMain = makeBackendUserMain(d)

  }, 100000)

  test("addOne: can add record.", async () => {
    const userManyPermissionMain = makeBackendUserManyPermissionMain(d)

    const addOne = await userManyPermissionMain.addOne({
      permissionId: permission.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(addOne.success).toBe(true)
    expect(addOne.data.dataValues.userId).toEqual(user.dataValues.id)
    expect(addOne.data.dataValues.permissionId).toEqual(permission.dataValues.id)
  })

  test("deleteOne: can delete record.", async () => {
    const userManyPermissionMain = makeBackendUserManyPermissionMain(d)

    const deleteOne = await userManyPermissionMain.deleteOne({
      permissionId: permission.dataValues.id,
      userId: user.dataValues.id,
    })
    expect(deleteOne.success).toBe(true)
  })

  test("setList: can add many records at once.", async () => {
    const userManyPermissionMain = makeBackendUserManyPermissionMain(d)

    const setList = await userManyPermissionMain.setList(
      [{
        permissionId: permission.dataValues.id,
        userId: user.dataValues.id,
      }]
    )
    expect(setList.success).toBe(true)
  })

  test("getAll: can get many records at once.", async () => {
    const userManyPermissionMain = makeBackendUserManyPermissionMain(d)

    const getAll = await userManyPermissionMain.getAll({
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

