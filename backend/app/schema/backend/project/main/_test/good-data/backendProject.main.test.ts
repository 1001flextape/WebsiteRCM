import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectMain from "../../backendProject.main"

jest.setTimeout(100000)


describe("test backendProject.main.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    
  }, 100000)
  
  test("getMany: can init record.", async () => {
    const publishMain = makeBackendProjectMain(d)

    const getMany = await publishMain.getMany()

    expect(getMany.data.length).toBe(1)
    
    // ending init project row for new row. Only one row has endedAt = null during runtime.
    await publishMain.updateOne({
      id: getMany.data[0].dataValues.id,
      endedAt: new Date(),
    })
  })

  test("addOne: can add record.", async () => {
    const publishMain = makeBackendProjectMain(d)

    const addOne = await publishMain.addOne({
      name: "test name",
      color: "color",
    })
    recordId = addOne.data.dataValues.id

    expect(addOne.data.dataValues.name).toEqual("test name")
    expect(addOne.data.dataValues.color).toEqual("color")
    expect(addOne.data.dataValues.startedAt).not.toBeNull()
  })

  test("getMany: can get all records.", async () => {
    const publishMain = makeBackendProjectMain(d)

    const getMany = await publishMain.getMany()

    expect(getMany.data.length).toBe(2)
  })

  test("getOneById: can get record.", async () => {
    const publishMain = makeBackendProjectMain(d)

    const getOneById = await publishMain.getOneById({
      id: recordId,
    })

    expect(getOneById.data.dataValues.name).toEqual("test name")
  })

  test("updateOne: can update record.", async () => {
    const publishMain = makeBackendProjectMain(d)

    const updatePage = await publishMain.updateOne({
      id: recordId,
      name: "test name2",
      color: "color2",
    })

    expect(updatePage.data.dataValues.name).toBe("test name2")
    expect(updatePage.data.dataValues.color).toBe("color2")
  })

  test("updateCurrentOne: can update record.", async () => {
    const publishMain = makeBackendProjectMain(d)

    const updateCurrentOne = await publishMain.updateCurrentOne({
      name: "test name3",
      color: "color3",
    })

    expect(updateCurrentOne.data.dataValues.name).toBe("test name3")
    expect(updateCurrentOne.data.dataValues.color).toBe("color3")

    const getOneById = await publishMain.getOneById({
      id: recordId,
    })

    expect(getOneById.data.dataValues.name).toBe("test name3")
    expect(getOneById.data.dataValues.color).toBe("color3")
  })

  test("getManyWithPagination: can get many with pagination.", async () => {
    const publishMain = makeBackendProjectMain(d)

    const getManyWithPagination = await publishMain.getManyWithPagination({})
    expect(getManyWithPagination.data.rows.length).toBeGreaterThan(0)
  })

  test("deleteOne: can delete record.", async () => {
    const publishMain = makeBackendProjectMain(d)

    const deleteOne = await publishMain.deleteOne({
      id: recordId,
    })

    expect(deleteOne.success).toBe(true)
  })

  test("getOneById: double check for deleted record.", async () => {
    const publishMain = makeBackendProjectMain(d)

    const getOneById = await publishMain.getOneById({
      id: recordId,
    })

    expect(getOneById.data).toBe(null)
  })

  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})

