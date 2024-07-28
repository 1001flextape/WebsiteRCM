import makeBackendUserSql from "../../../user/preMain/backendUser.sql"
import makeBackendNotificationSql from "../backendNotification.sql"
import makeBackendNotificationValidation from "../backendNotification.validation"
import { v4 as uuidv4 } from "uuid"
import backendUser from "../../../../../models/backend/user/backendUser.model"
import { Model } from "sequelize"
import { notificationIconEnum, notificationTypeEnum } from "../scripts/sql/addOne.script"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency"
jest.setTimeout(100000)

describe("test backendNotification.validation.js", () => {
  let d: dependencies
  let recordId: string
  let userId: string

  beforeAll(async () => {

    d = await makeDTestObj()

    const backendUserSql = makeBackendUserSql(d)

    const notificationSql = makeBackendNotificationSql(d)

    const user = (await backendUserSql.addOne({
      email: "notication@testemail.com",
      password: "password",
      isAdmin: true,
    })).data

    userId = user.dataValues.id;

    // const transaction = await db.transaction()

    const notification = await notificationSql.addOne({
      message: "testing-blah-blah-1",
      userId,
      action: {
        type: notificationTypeEnum.URL,
        icon: notificationIconEnum.DISCUSSION,
        data: {
          url: "url"
        }
      }
    })

    recordId = notification.data.dataValues.id

    userId = user.dataValues.id

  }, 100000)

  test("areIdsValid: Yes", async () => {
    const notificationValidation = makeBackendNotificationValidation(d)

    const areIdsValid = await notificationValidation.areIdsValid({
      idArray: [recordId]
    })
    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const notificationValidation = makeBackendNotificationValidation(d)

    const areIdsValid = await notificationValidation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })
    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const notificationValidation = makeBackendNotificationValidation(d)

    const isIdValid = await notificationValidation.isIdValid({
      id: recordId,
    })
    expect(isIdValid.result).toBe(true);
  })

  test("isIdValid: No", async () => {
    const notificationValidation = makeBackendNotificationValidation(d)

    const isIdValid = await notificationValidation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  afterAll(async () => {
    await d.dbTransaction.rollback();
    ;
  })
})