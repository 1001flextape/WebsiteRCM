import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import makeBackendUserMain from "../../backendUser.main";
import makeBackendUserProfileMain from "../../backendUserProfile.main";
import { CallByTypeEnum } from "../../../preMain/scripts/userProfileSql/upsertOne.script";
import backendUser from "../../../../../../models/backend/user/backendUser.model";
jest.setTimeout(100000)

describe("test backendUserProfile.main.js", () => {
  let d: dependencies
  let user: Model<backendUser>;
  let recordId: string;


  beforeAll(async () => {

    d = await makeDTestObj()

    

    const backendUserMain = makeBackendUserMain(d)

    user = (await backendUserMain.addOne({
      email: "userprofile@test.com",
      password: "Password1!",
      isAdmin: true,
    })).data

  }, 100000)

  test("upsertOne: add user profile.", async () => {
    const userProfile = makeBackendUserProfileMain(d)

    const upsertOne = await userProfile.upsertOne({
      userId: user.dataValues.id,
      displayName: "displayName",
      callByType: CallByTypeEnum.EMAIL,
      circleColor: "circleColor",
      firstName: "firstName",
      labelColor: "labelColor",
      lastName: "lastName",
      picture: "picture",
      username: "username",
    })
    recordId = upsertOne.data.dataValues.id

    expect(upsertOne.success).toBe(true)
    expect(upsertOne.data.dataValues.userId).toEqual(user.dataValues.id);
    expect(upsertOne.data.dataValues.displayName).toEqual("displayName");
    expect(upsertOne.data.dataValues.callByType).toEqual(CallByTypeEnum.EMAIL);
    expect(upsertOne.data.dataValues.circleColor).toEqual("circleColor");
    expect(upsertOne.data.dataValues.firstName).toEqual("firstName");
    expect(upsertOne.data.dataValues.labelColor).toEqual("labelColor");
    expect(upsertOne.data.dataValues.lastName).toEqual("lastName");
    expect(upsertOne.data.dataValues.picture).toEqual("picture");
    expect(upsertOne.data.dataValues.username).toEqual("username");

  })


  test("getOneById: get record.", async () => {
    const backendUserBasicViewMain = makeBackendUserProfileMain(d)

    const getOneById = await backendUserBasicViewMain.getOneById({
      id: recordId
    })
    
    expect(getOneById.success).toBe(true)
    expect(getOneById.data.dataValues.userId).toEqual(user.dataValues.id);
    expect(getOneById.data.dataValues.displayName).toEqual("displayName");
    expect(getOneById.data.dataValues.callByType).toEqual(CallByTypeEnum.EMAIL);
    expect(getOneById.data.dataValues.circleColor).toEqual("circleColor");
    expect(getOneById.data.dataValues.firstName).toEqual("firstName");
    expect(getOneById.data.dataValues.labelColor).toEqual("labelColor");
    expect(getOneById.data.dataValues.lastName).toEqual("lastName");
    expect(getOneById.data.dataValues.picture).toEqual("picture");
    expect(getOneById.data.dataValues.username).toEqual("username");
  })

  test("updateOne: makeBackendUserProfile.", async () => {
    const backendUserBasicViewMain = makeBackendUserProfileMain(d)

    const getOneByUserId = await backendUserBasicViewMain.getOneByUserId({
      userId: user.dataValues.id,
      // add values later
    })
    
    expect(getOneByUserId.success).toBe(true)
    expect(getOneByUserId.data.dataValues.userId).toEqual(user.dataValues.id);
    expect(getOneByUserId.data.dataValues.displayName).toEqual("displayName");
    expect(getOneByUserId.data.dataValues.callByType).toEqual(CallByTypeEnum.EMAIL);
    expect(getOneByUserId.data.dataValues.circleColor).toEqual("circleColor");
    expect(getOneByUserId.data.dataValues.firstName).toEqual("firstName");
    expect(getOneByUserId.data.dataValues.labelColor).toEqual("labelColor");
    expect(getOneByUserId.data.dataValues.lastName).toEqual("lastName");
    expect(getOneByUserId.data.dataValues.picture).toEqual("picture");
    expect(getOneByUserId.data.dataValues.username).toEqual("username");

  })

  test("upsertOne: edit user profile.", async () => {
    const userProfile = makeBackendUserProfileMain(d)

    const newUserProfile = await userProfile.upsertOne({
      userId: user.dataValues.id,
      displayName: "displayName2",
      callByType: CallByTypeEnum.EMAIL,
      circleColor: "circleColor2",
      firstName: "firstName2",
      labelColor: "labelColor2",
      lastName: "lastName2",
      picture: "picture2",
      username: "username2",
    })
    recordId = newUserProfile.data.dataValues.id

    expect(newUserProfile.success).toBe(true)
    expect(newUserProfile.data.dataValues.userId).toEqual(user.dataValues.id);
    expect(newUserProfile.data.dataValues.displayName).toEqual("displayName2");
    expect(newUserProfile.data.dataValues.callByType).toEqual(CallByTypeEnum.EMAIL);
    expect(newUserProfile.data.dataValues.circleColor).toEqual("circleColor2");
    expect(newUserProfile.data.dataValues.firstName).toEqual("firstName2");
    expect(newUserProfile.data.dataValues.labelColor).toEqual("labelColor2");
    expect(newUserProfile.data.dataValues.lastName).toEqual("lastName2");
    expect(newUserProfile.data.dataValues.picture).toEqual("picture2");
    expect(newUserProfile.data.dataValues.username).toEqual("username2");

  })

  afterAll(async () => {
    await d.dbTransaction.rollback();
    ;
  })
})