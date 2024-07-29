import makeBackendUserSql from "../backendUser.sql"
import { v4 as uuidv4 } from "uuid"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendUser.sql.js", () => {
  let d: dependencies
  let recordId = uuidv4()
  let recordId2;


  beforeAll(async () => {

    d = await makeDTestObj()

    

  }, 100000)

  test("getManyWithPagination: can get many record.", async () => {
    const userSql = makeBackendUserSql(d)

    const newUser = await userSql.getManyWithPagination({})
    expect(newUser.success).toBe(true)
    expect(newUser.data.rows.length).toBe(0)
  })

  test("addOne: can add record.", async () => {
    const userSql = makeBackendUserSql(d)

    const newUser = await userSql.addOne({
      isAdmin: true,
      email: "email@test.com",
      password: "password",
    })
    recordId = newUser.data.dataValues.id;

    expect(newUser.data.dataValues.email).toEqual("email@test.com")
    expect(newUser.data.dataValues.isAdmin).toBe(true)
  })

  test("getOneById: can get record.", async () => {
    const userSql = makeBackendUserSql(d)

    const getOneById = await userSql.getOneById({
      id: recordId,
    })
    expect(getOneById.data.dataValues.id).toEqual(recordId)
    expect(getOneById.data.dataValues.isAdmin).toBe(true)
  })

  test("getOneByEmail: can get record.", async () => {
    const userSql = makeBackendUserSql(d)

    const getOneByEmail = await userSql.getOneByEmail({
      email: "email@test.com",
    })
    expect(getOneByEmail.data.dataValues.id).toEqual(recordId)
    expect(getOneByEmail.data.dataValues.isAdmin).toBe(true)
  })

  test("updateOne: can update record.", async () => {
    const userSql = makeBackendUserSql(d)

    const updateUser = await userSql.updateOne({
      id: recordId,
      isAdmin: false,
    })
    expect(updateUser.data.dataValues.id).toEqual(recordId)
    expect(updateUser.data.dataValues.isAdmin).toBe(false)
  })

  test("getManyWithPagination: can get many record.", async () => {
    const userSql = makeBackendUserSql(d)


    const newUser = await userSql.getManyWithPagination({})
    expect(newUser.success).toBe(true)
    expect(newUser.data.rows.length).toBe(1)
  })

  test("deleteOne: can update record.", async () => {
    const userSql = makeBackendUserSql(d)

    const deletedUser = await userSql.deleteOne({
      id: recordId,
    })

    expect(deletedUser.success).toBe(true)
  })

  afterAll(async () => {
    ;
    await d.dbTransaction.rollback();
  })
})

