import { v4 as uuidv4 } from "uuid"
import makeBackendRoleSql from "../../../role/preMain/backendRole.sql"
import makeBackendUserSql from "../backendUser.sql"
import makeBackendUserValidation from "../backendUser.validation"
import makeBackendPermissionSql from "../../../permission/preMain/backendPermission.sql"
import makeBackendUserManyPermissionSql from "../backendUserManyPermission.sql"
import makeBackendUserManyRoleSql from "../backendUserManyRole.sql"
import { Model } from "sequelize";
import backendUser from "../../../../../models/backend/user/backendUser.model";
import backendRole from "../../../../../models/backend/role/backendRole.model";
import backendPermission from "../../../../../models/backend/permission/backendPermission.model";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)

describe("test backendUser.validation.js", () => {
  let d: dependencies
  let user: Model<backendUser>

  beforeAll(async () => {
    
    d = await makeDTestObj()

  }, 100000)

  test("doesAUserExist: No", async () => {

    const userValidation = makeBackendUserValidation(d)
    // const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const doesAUserExists = await userValidation.doesAUserExists()

    expect(doesAUserExists.result).toBe(false)
  })

  test("doesAUserExist: Yes", async () => {

    const userValidation = makeBackendUserValidation(d)
  
    const backendUserSql = makeBackendUserSql(d)
  
    user = (await backendUserSql.addOne({
      email: "userValidation@test.com",
      password: "Password1!",
      isAdmin: true,
    })).data

    const doesAUserExists = await userValidation.doesAUserExists()

    expect(doesAUserExists.result).toBe(true)
  })

  test("isIdValid: No", async () => {

    const userValidation = makeBackendUserValidation(d)
    // const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const isIdValid = await userValidation.isIdValid({
      id: "2f30794d-3b68-42ed-bc02-4ac5a5cee91a",
    })

    expect(isIdValid.result).toBe(false)
  })

  test("isIdValid: Yes", async () => {

    const userValidation = makeBackendUserValidation(d)
    // const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const isIdValid = await userValidation.isIdValid({
      id: user.dataValues.id,
    })

    expect(isIdValid.result).toBe(true)
  })

  test("isEmailTaken: No", async () => {

    const userValidation = makeBackendUserValidation(d)
    // const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const isEmailTaken = await userValidation.isEmailTaken({
      email: "test-user-validation@email.com",
    })

    expect(isEmailTaken.result).toBe(false)
  })

  test("isEmailTaken: Yes", async () => {

    const userValidation = makeBackendUserValidation(d)
    // const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const isEmailTaken = await userValidation.isEmailTaken({
      email: user.dataValues.email,
    })

    expect(isEmailTaken.result).toBe(true)
  })

  
  test("isPasswordValid: No", async () => {

    const userValidation = makeBackendUserValidation(d)
    // const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const isPasswordValid = await userValidation.isPasswordValid({
      password: "password",
    })

    expect(isPasswordValid.result).toBe(false)
  })

  
  test("isPasswordValid: Yes", async () => {

    const userValidation = makeBackendUserValidation(d)
    // const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const isPasswordValid = await userValidation.isPasswordValid({
      password: "Password1!",
    })

    expect(isPasswordValid.result).toBe(true)
  })

  
  test("isPasswordCorrect: No", async () => {

    const userValidation = makeBackendUserValidation(d)

    const isPasswordValid = await userValidation.isPasswordCorrect({
      password: "bad-password",
      encryptedPassword: user.dataValues.password,
    })

    expect(isPasswordValid.result).toBe(false)
  })
  
  test("isPasswordCorrect: Yes", async () => {

    const userValidation = makeBackendUserValidation(d)

    const isPasswordValid = await userValidation.isPasswordCorrect({
      password: "Password1!",
      encryptedPassword: user.dataValues.password,
    })

    expect(isPasswordValid.result).toBe(true)
  })

  afterAll(async () => {
    ;
    await d.dbTransaction.rollback();
  })
})