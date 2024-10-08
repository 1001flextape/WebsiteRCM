import makeBackendPermissionMain from "../../backendPermission.main";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendPermission.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    

  }, 100000)

  test("backendPermission_addMany_error:0001: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    const addMany = await backendPermissionMain.addMany(null)

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("backendPermission_addMany_error:0001")
  })

  test("backendPermission_addMany_error:0002: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    const addMany = await backendPermissionMain.addMany(new Array(51).map((element, i) => ({
      name: `testname-${i}`
    })))

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("backendPermission_addMany_error:0002")
  })

  test("backendPermission_addMany_error:0003: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    const addMany = await backendPermissionMain.addMany([
      {
        name: undefined
      },
      {
        name: "A super cool new permission."
      },
    ])

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("backendPermission_addMany_error:0003")
  })

  test("backendPermission_addMany_error:0004: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    const addMany = await backendPermissionMain.addMany([
      {
        name: "12345678901234567890123456789012345678901234567890. too long. "
      },
    ])

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("backendPermission_addMany_error:0004")
  })

  test("backendPermission_addMany_error:0005: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    await backendPermissionMain.addMany([
      {
        name: "error0005: This name will repeat to fail.",
      }
    ])

    const addMany = await backendPermissionMain.addMany([
      {
        name: "error0005: This name will repeat to fail.",
      }
    ])
    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("backendPermission_addMany_error:0005")
  })

  afterAll(async () => {
    await d.dbTransaction.rollback();
  })
})