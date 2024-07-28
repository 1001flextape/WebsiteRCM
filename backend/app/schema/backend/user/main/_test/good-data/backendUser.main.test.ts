import makeBackendUserMain from "../../backendUser.main";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendUser.main.js", () => {
  let d: dependencies
  let recordId;

  beforeAll(async () => {

    d = await makeDTestObj()



  }, 100000)

  test("getManyWithPagination: can get many record.", async () => {
    const userMain = makeBackendUserMain(d)

    const newUser = await userMain.getManyWithPagination({})
    expect(newUser.success).toBe(true)
    expect(newUser.data.rows.length).toBe(0)
  })

  test("addOne: can add record.", async () => {
    const userMain = makeBackendUserMain(d)

    const newUser = await userMain.addOne({
      email: "test@thisDomainnotreal.com",
      password: "asdfASDF1!",
    })
    recordId = newUser.data.dataValues.id

    expect(newUser.data.dataValues.email).toBe("test@thisDomainnotreal.com")
    expect(newUser.data.dataValues.isAdmin).toBe(true)
  })

  test("getOneById: can get record.", async () => {
    const userMain = makeBackendUserMain(d)

    const getOneById = await userMain.getOneById({
      id: recordId,
    })
    expect(getOneById.data.dataValues.id).toBe(recordId)
    expect(getOneById.data.dataValues.email).toBe("test@thisDomainnotreal.com")
    expect(getOneById.data.dataValues.isAdmin).toBe(true)
  })

  test("updateOne: can update record.", async () => {
    const userMain = makeBackendUserMain(d)

    const updateUser = await userMain.updateOne({
      id: recordId,
      isAdmin: false,
    })
    expect(updateUser.data.dataValues.id).toBe(recordId)
    expect(updateUser.data.dataValues.email).toBe("test@thisDomainnotreal.com")
    expect(updateUser.data.dataValues.isAdmin).toBe(false)
  })

  test("deactivateOne: can deactivate user.", async () => {
    const userMain = makeBackendUserMain(d)

    const deactivateOne = await userMain.deactivateOne({
      id: recordId,
    })
    expect(deactivateOne.success).toBe(true)
    expect(deactivateOne.data.dataValues.id).toBe(recordId)
    expect(deactivateOne.data.dataValues.email).toBe("test@thisDomainnotreal.com")
    expect(deactivateOne.data.dataValues.isAdmin).toBe(false)
    expect(deactivateOne.data.dataValues.isDeactivated).toBe(true)
  })

  test("reactivateOne: can deactivate user.", async () => {
    const userMain = makeBackendUserMain(d)

    const deactivateOne = await userMain.reactivateOne({
      id: recordId,
    })
    expect(deactivateOne.success).toBe(true)
    expect(deactivateOne.data.dataValues.id).toBe(recordId)
    expect(deactivateOne.data.dataValues.email).toBe("test@thisDomainnotreal.com")
    expect(deactivateOne.data.dataValues.isAdmin).toBe(false)
    expect(deactivateOne.data.dataValues.isDeactivated).toBe(false)
  })

  test("getManyWithPagination: can get many record.", async () => {
    const userMain = makeBackendUserMain(d)


    const newUser = await userMain.getManyWithPagination({})
    expect(newUser.success).toBe(true)
    expect(newUser.data.rows.length).toBe(1)
  })

  test("deleteOne: backendUsers can delete record.", async () => {
    const userMain = makeBackendUserMain(d)

    const deletedUser = await userMain.deleteOne({
      id: recordId,
    })

    expect(deletedUser.success).toBe(true)
  })

  afterAll(async () => {

    await d.dbTransaction.rollback()
  })
})

