import makeBackendAuthFunc from "../backendAuth.func";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendRole.func.js", () => {
  let d: dependencies
  let token: any

  beforeAll(async () => {

    d = await makeDTestObj()
    
  }, 100000)

  test("signinToken: works.", async () => {
    const authFunc = makeBackendAuthFunc(d)

    token = await authFunc.signinToken({
      userId: "userId",
    })

    expect(token.success).toEqual(true)
  })

  test("getDataFromToken: backendRoles can add record.", async () => {
    const authFunc = makeBackendAuthFunc(d)

    const checkedToken = await authFunc.getDataFromToken({
      token: token.data,
    })

    expect(checkedToken.success).toEqual(true)
    expect(checkedToken.data.userId).toEqual("userId")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

