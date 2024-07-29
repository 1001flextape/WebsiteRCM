import { v4 as uuidv4 } from "uuid"
import { Model } from "sequelize";
import makeBackendUserMain from "../../backendUser.main";
import backendRole from "../../../../../../models/backend/role/backendRole.model";
import makeBackendUserBasicViewMain from "../../backendUserBasicView.main";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import backendUser from "../../../../../../models/backend/user/backendUser.model";
import { CallByTypeEnum } from "../../../preMain/scripts/userProfileSql/upsertOne.script";
import makeBackendUserProfileMain from "../../backendUserProfile.main";
import backendUserProfile from "../../../../../../models/backend/user/backendUserProfile.model";
jest.setTimeout(100000)


describe("test backendUserBasicView.main.js", () => {
  let d: dependencies
  let user: Model<backendUser>
  let userProfile: Model<backendUserProfile>

  beforeAll(async () => {

    d = await makeDTestObj()

    const backendUserMain = makeBackendUserMain(d)
    const backendUserProfileMain = makeBackendUserProfileMain(d)

    user = (await backendUserMain.addOne({
      email: "aasdfasdf@sdfjkeffejk.com",
      password: "ASDFASDFasdfjkle@!#124hk242!@",
    })).data

    userProfile = (await backendUserProfileMain.upsertOne({
      userId: user.dataValues.id,
      callByType: CallByTypeEnum.EMAIL,
      circleColor: "circleColor",
      displayName: "displayName",
      firstName: "firstName",
      labelColor: "labelColor",
      lastName: "lastName",
      picture: "picture",
      username: "username",
    })).data

  }, 100000)

  test("me: can get my view.", async () => {
    const backendUserBasicViewMain = makeBackendUserBasicViewMain(d)

    const me = await backendUserBasicViewMain.me({
      userId: user.dataValues.id
    })
    expect(me.success).toBe(true);
    expect(me.data.callByType).toEqual(CallByTypeEnum.EMAIL);
    expect(me.data.circleColor).toEqual("circleColor");
    expect(me.data.displayName).toEqual("displayName");
    expect(me.data.firstName).toEqual("firstName");
    expect(me.data.labelColor).toEqual("labelColor");
    expect(me.data.lastName).toEqual("lastName");
    expect(me.data.picture).toEqual("picture");
    expect(me.data.username).toEqual("username");
  })

  test("them: can get their view.", async () => {
    const backendUserBasicViewMain = makeBackendUserBasicViewMain(d)

    const them = await backendUserBasicViewMain.them({
      userId: user.dataValues.id,
    })
    
    expect(them.success).toBe(true);
    expect(them.data.callByType).toEqual(CallByTypeEnum.EMAIL);
    expect(them.data.circleColor).toEqual("circleColor");
    expect(them.data.displayName).toEqual("displayName");
    expect(them.data.firstName).toEqual("firstName");
    expect(them.data.labelColor).toEqual("labelColor");
    expect(them.data.lastName).toEqual("lastName");
    expect(them.data.picture).toEqual("picture");
    expect(them.data.username).toEqual("username");
  })

  afterAll(async () => {

    await d.dbTransaction.rollback()
  })
})