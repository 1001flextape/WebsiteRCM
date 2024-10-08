import makeSocketLookUp from "../../../_singleton/preMain/socketLookUp.ram-cache";
import makeWhoIsOnPage from "../../../_singleton/preMain/whoIsOnPage.ram-cache";
import makeCollaborateWhoIsOnPageMain from "../collaborateWhoIsOnPage.main";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test collaborateWhoIsOnPage.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

    const lookUp = makeSocketLookUp(d)

    await lookUp.set({
      socket: { fakeSocket: true, emit: () => { } },
      email: "test1@test.com",
      socketId: "testSocketId1",
      userId: "testUserId1",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: () => { } },
      email: "test2@test.com",
      socketId: "testSocketId2",
      userId: "testUserId2",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: () => { } },
      email: "test3@test.com",
      socketId: "testSocketId3",
      userId: "testUserId3",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: () => { } },
      email: "test3@test.com",
      socketId: "testSocketId4",
      userId: "testUserId3",
    })
  }, 100000)

  test("WhoIsOnPage collab: get all users.", async () => {

    const whoIsOnPage = makeWhoIsOnPage(d)

    await whoIsOnPage.changeUrlForUser({
      socketId: "testSocketId3",
      currentAsPath: "/test/test",
      currentPathname: "/test/test",
    })

    const collabWhoIsOnPage = makeCollaborateWhoIsOnPageMain(d)

    const result = await collabWhoIsOnPage.getAllUsersFromPage({
      url: "/test/test"
    })

    expect(result.data.total).toBe(1)
    expect(result.data.users.length).toBe(1)
  })


  afterAll(async () => {
    await d.dbTransaction.rollback();
    ;
  })
})

