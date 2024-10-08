import makeBackendNotificationMain from "../backendNotification.main";
import { v4 as uuidv4 } from "uuid"
import { notificationIconEnum, notificationTypeEnum } from "../../preMain/scripts/sql/addOne.script";
import makeBackendUserSql from "../../../user/preMain/backendUser.sql";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendNotification.main.js", () => {
  let d: dependencies
  let recordId: string
  let userId: string

  beforeAll(async () => {
    
    d = await makeDTestObj()

    const backendUserSql = makeBackendUserSql(d)

    let uuid = uuidv4();

    const user = (await backendUserSql.addOne({
      email: "notication@testemail.com",
      password: "password",
      isAdmin: true,
    })).data

    userId = user.dataValues.id

  }, 100000)

  test("addOne: backendNotification can add record.", async () => {
    const notificationMain = makeBackendNotificationMain(d)

    const addOne = await notificationMain.addOne({
      userId,
      message: "Cool message!",
      action: {
        type: notificationTypeEnum.MEETING,
        icon: notificationIconEnum.MEETING,
        data: {
          meetingId: "1234"
        }
      }
    })
    recordId = addOne.data.dataValues.id
    expect(addOne.data.dataValues.message).toEqual("Cool message!")
  })

  test("getOneById: backendNotification can add record.", async () => {
    const notificationMain = makeBackendNotificationMain(d)

    const getNotification = await notificationMain.getOneById({
      id: recordId,
    })
    expect(getNotification.data.dataValues.message).toEqual("Cool message!")
  })

  test("updateOne: backendNotification can add record.", async () => {
    const notificationMain = makeBackendNotificationMain(d)

    const updateNotification = await notificationMain.updateOne({
      id: recordId,
      message: "Cool message notifications!",
    })
    expect(updateNotification.data.dataValues.message).toEqual("Cool message notifications!")
  })


  test("getFirstByCount: backendNotification can add record.", async () => {
    const notificationMain = makeBackendNotificationMain(d)

    await notificationMain.addOne({
      userId,
      message: "Cool message1!",
      action: {
        type: notificationTypeEnum.MEETING,
        icon: notificationIconEnum.MEETING,
        data: {
          meetingId: "1234"
        }
      }
    })

    await notificationMain.addOne({
      userId,
      message: "Cool message12",
      action: {
        type: notificationTypeEnum.MEETING,
        icon: notificationIconEnum.MEETING,
        data: {
          meetingId: "1234"
        }
      }
    })

    await notificationMain.addOne({
      userId,
      message: "Cool message3!",
      action: {
        type: notificationTypeEnum.MEETING,
        icon: notificationIconEnum.MEETING,
        data: {
          meetingId: "1234"
        }
      }
    })

    await notificationMain.addOne({
      userId,
      message: "Cool message4!",
      action: {
        type: notificationTypeEnum.MEETING,
        icon: notificationIconEnum.MEETING,
        data: {
          meetingId: "1234"
        }
      }
    })

    const result = await notificationMain.getFirstByCount({
      userId,
    })

    expect(result.data.length).toBe(3)
  })

  test("getUnseenNotificationCount", async () => {
    const notificationMain = makeBackendNotificationMain(d)

    const hasBeenSeen = await notificationMain.getUnseenNotificationCount({
      userId,
    })

    expect(hasBeenSeen.success).toBe(true)
    expect(hasBeenSeen.data).toBe(5)
  })

  test("hasBeenClick", async () => {
    const notificationMain = makeBackendNotificationMain(d)

    const hasBeenClick = await notificationMain.hasBeenClick({
      id: recordId,
    })

    expect(hasBeenClick.success).toBe(true)
    expect(hasBeenClick.data.dataValues.hasBeenClicked).toBe(true)
  })


  test("hasBeenSeen", async () => {
    const notificationMain = makeBackendNotificationMain(d)

    const hasBeenSeen = await notificationMain.hasBeenSeen({
      userId,
    })

    expect(hasBeenSeen.success).toBe(true)
    expect(hasBeenSeen.data.length).toBe(5)
  })

  test("getUnseenNotificationCount: should be all seen", async () => {
    const notificationMain = makeBackendNotificationMain(d)

    const hasBeenSeen = await notificationMain.getUnseenNotificationCount({
      userId,
    })

    expect(hasBeenSeen.success).toBe(true)
    expect(hasBeenSeen.data).toBe(0)
  })

  test("deleteOne: backendNotification can delete record.", async () => {
    const notificationMain = makeBackendNotificationMain(d)

    const deletedNotification = await notificationMain.deleteOne({
      id: recordId,
    })

    expect(deletedNotification.success).toBe(true)
  })
  // test("doYouHaveNewNotifications", async () => {

  //   const notificationMain = makeBackendNotificationMain(d)

  //   const deletedNotification = await notificationMain.doYouHaveNewNotifications({
  //     userId,
  //     // id: recordId,
  //   })

  //   expect(deletedNotification.success).toBe(true)
  // })

  afterAll(async () => {
    await d.dbTransaction.rollback();
    ;
  })
})

