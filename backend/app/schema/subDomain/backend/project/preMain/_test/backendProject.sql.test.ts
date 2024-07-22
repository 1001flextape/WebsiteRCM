import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendProjectSql from "../backendProject.sql";
jest.setTimeout(100000)


describe("test backendProject.sql.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("addOne: can add record.", async () => {
    const publishSql = makeBackendProjectSql(d)

    const addOne = await publishSql.addOne({
      name: "test name",
      color: "color",
    })
    recordId = addOne.data.dataValues.id

    expect(addOne.data.dataValues.name).toEqual("test name")
    expect(addOne.data.dataValues.color).toEqual("color")
    expect(addOne.data.dataValues.startedAt).not.toBeNull()
  })

  test("getMany: can get all records.", async () => {
    const publishSql = makeBackendProjectSql(d)

    const getMany = await publishSql.getMany()

    expect(getMany.data.length).toBe(1)
  })

  test("getOneById: can get record.", async () => {
    const publishSql = makeBackendProjectSql(d)

    const getOneById = await publishSql.getOneById({
      id: recordId,
    })

    expect(getOneById.data.dataValues.name).toEqual("test name")
  })

  test("updateOne: can update record.", async () => {
    const publishSql = makeBackendProjectSql(d)

    const updatePage = await publishSql.updateOne({
      id: recordId,
      name: "test name2",
      color: "color2",
    })
    
    expect(updatePage.data.dataValues.name).toBe("test name2")
    expect(updatePage.data.dataValues.color).toBe("color2")
  })

  test("getManyWithPagination: can get many with pagination.", async () => {
    const publishSql = makeBackendProjectSql(d)

    const getManyWithPagination = await publishSql.getManyWithPagination({})
    expect(getManyWithPagination.data.rows.length).toBeGreaterThan(0)
  })
  
  test("deleteOne: can delete record.", async () => {
    const publishSql = makeBackendProjectSql(d)

    const deleteOne = await publishSql.deleteOne({
      id: recordId,
    })

    expect(deleteOne.success).toBe(true)
  })

  test("getOneById: double check for deleted record.", async () => {
    const publishSql = makeBackendProjectSql(d)

    const getOneById = await publishSql.getOneById({
      id: recordId,
    })

    expect(getOneById.data).toBe(null)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

