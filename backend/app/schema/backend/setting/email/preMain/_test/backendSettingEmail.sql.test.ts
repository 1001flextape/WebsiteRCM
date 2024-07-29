import { Sequelize } from "sequelize-typescript";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import makeBackendSettingEmailSql from "../backendSettingEmail.sql";
jest.setTimeout(100000)


describe("test backendSettingEmail.sql.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()

  }, 100000)

  test("updateOne: can edit record.", async () => {
    const settingEmail = makeBackendSettingEmailSql(d)

    const upsertOne = await settingEmail.upsertOne({
      emailVerificationSubject: "emailVerificationSubject",
      emailVerificationMessage: "emailVerificationMessage",
      passwordResetSubject: "passwordResetSubject",
      passwordResetMessage: "passwordResetMessage",
      resetPasswordEmailSubject: "resetPasswordEmailSubject",
      resetPasswordEmailMessage: "resetPasswordEmailMessage",
      inviteUserSubject: "inviteUserSubject",
      inviteUserMessage: "inviteUserMessage",
    })
    recordId = upsertOne.data.dataValues.id

    expect(upsertOne.data.dataValues.emailVerificationSubject).toEqual("emailVerificationSubject")
    expect(upsertOne.data.dataValues.emailVerificationMessage).toEqual("emailVerificationMessage")
    expect(upsertOne.data.dataValues.passwordResetSubject).toEqual("passwordResetSubject")
    expect(upsertOne.data.dataValues.passwordResetMessage).toEqual("passwordResetMessage")
    expect(upsertOne.data.dataValues.resetPasswordEmailSubject).toEqual("resetPasswordEmailSubject")
    expect(upsertOne.data.dataValues.resetPasswordEmailMessage).toEqual("resetPasswordEmailMessage")
    expect(upsertOne.data.dataValues.inviteUserSubject).toEqual("inviteUserSubject")
    expect(upsertOne.data.dataValues.inviteUserMessage).toEqual("inviteUserMessage")
  })

  test("getOne: can get record.", async () => {
    const settingEmail = makeBackendSettingEmailSql(d)

    const getOne = await settingEmail.getOne()
    expect(getOne.data.dataValues.emailVerificationSubject).toEqual("emailVerificationSubject")
    expect(getOne.data.dataValues.emailVerificationMessage).toEqual("emailVerificationMessage")
    expect(getOne.data.dataValues.passwordResetSubject).toEqual("passwordResetSubject")
    expect(getOne.data.dataValues.passwordResetMessage).toEqual("passwordResetMessage")
    expect(getOne.data.dataValues.resetPasswordEmailSubject).toEqual("resetPasswordEmailSubject")
    expect(getOne.data.dataValues.resetPasswordEmailMessage).toEqual("resetPasswordEmailMessage")
    expect(getOne.data.dataValues.inviteUserSubject).toEqual("inviteUserSubject")
    expect(getOne.data.dataValues.inviteUserMessage).toEqual("inviteUserMessage")
  })

  afterAll(async () => {
    d.dbTransaction.rollback();
  })
})

