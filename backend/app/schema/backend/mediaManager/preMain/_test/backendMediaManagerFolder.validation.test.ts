import makeBackendUserMain from "../../../user/main/backendUser.main";
import makeBackendMediaManagerFolderSql from "../backendMediaManagerFolder.sql";
import makeBackendMediaManagerFolderValidation from "../backendMediaManagerFolder.validation";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import { Model } from "sequelize";
import backendUser from "../../../../../models/backend/user/backendUser.model";
jest.setTimeout(100000)

describe("test backendMediaManagerFolder.validation.js", () => {
  let d: dependencies;
  let firstFolderRecordId: string;
  let user1: Model<backendUser>;

  beforeAll(async () => {
    
    d = await makeDTestObj()

    const backendUser = makeBackendUserMain(d)

    user1 = (await backendUser.addOne({
      email: "testingMediaFolder+test@test.com",
      password: "ASDFasdf1!",
    })).data

    
    const mediaManagerFolderSql = makeBackendMediaManagerFolderSql(d)

    const folder = await mediaManagerFolderSql.addOne({
      createdBy: user1.dataValues.id,
      name: "cool name!",
    })

    // record root folder
    firstFolderRecordId = folder.data.dataValues.id

  }, 100000)

  test("isIdValid: is the id a valid record?", async () => {
    const mediaManagerFolderValidation = makeBackendMediaManagerFolderValidation(d)
    
    const validate = await mediaManagerFolderValidation.isIdValid({
        id: firstFolderRecordId
    })

    expect(validate.result).toBe(true)

    const notValid = await mediaManagerFolderValidation.isIdValid({
        id: '5bcfa1c0-2a62-4f6b-b1ff-011a745b09ca'
    })

    expect(notValid.result).toBe(false)
  })

})

