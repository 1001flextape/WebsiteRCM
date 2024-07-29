import makeSocketLookUp from "../socketLookUp.ram-cache";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import { CallByTypeEnum } from "../../../../backend/user/preMain/scripts/userProfileSql/upsertOne.script";
jest.setTimeout(100000)


describe("test collaborateSamePage.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("singleton: test adding one lookup.", async () => {
    const lookUp = makeSocketLookUp(d)

    const result = await lookUp.set({
        socket: {fakeSocket: true},
        socketId: "testSocketId",
        userId: "testUserId",
    })

    expect(result.data[0]["socketId"]).toBe("testSocketId")
    expect(result.data[0]["userId"]).toBe("testUserId")
  })

  test("singleton: test get one lookup.", async () => {
    const lookUp = makeSocketLookUp(d)

    const result = await lookUp.get()

    expect(result.data[0]["socketId"]).toBe("testSocketId")
    expect(result.data[0]["userId"]).toBe("testUserId")
  })

  test("singleton: test update one lookup.", async () => {
    const lookUp = makeSocketLookUp(d)

    await lookUp.updateBySocketId({
      socketId: "testSocketId",
      isTabFocus: true,
      callByType: CallByTypeEnum.FIRST_NAME,
      firstName: "firstname1",

    })

    const result = await lookUp.get()

    expect(result.data[0]["socketId"]).toBe("testSocketId")
    expect(result.data[0]["userId"]).toBe("testUserId")
    expect(result.data[0].isTabFocus).toEqual(true)
  })
  
  test("singleton: test getUsernameForSocket.", async () => {
    const lookUp = makeSocketLookUp(d)

    const result = await lookUp.getUsernameForSocket({
      socketId: "testSocketId",
    })

    expect(result.data).toBe("firstname1")
  })

  test("singleton: test remove one lookup.", async () => {
    const lookUp = makeSocketLookUp(d)

    await lookUp.removeBySocketId({
      socketId: "testSocketId"
    })

    const result = await lookUp.get()

    expect(result.data.length).toEqual(0)
  })



  afterAll(async () => {
    await d.dbTransaction.rollback();
    ;
  })
})

