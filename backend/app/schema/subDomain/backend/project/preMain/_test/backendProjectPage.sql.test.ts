import backendProject from "../../../../../../models/subDomain/backend/project/backendProject.model";
import backendProjectPage from "../../../../../../models/subDomain/backend/project/backendProjectPage.model";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendProjectSql from "../backendProject.sql";
import makeBackendProjectPageSql from "../backendProjectPage.sql";
jest.setTimeout(100000)


describe("test backendProjectPage.sql.js", () => {

  let d: dependencies
  let record: backendProjectPage
  let project: backendProject

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const backendProject = makeBackendProjectSql(d)

    const newProject = await backendProject.addOne({
      name: "Test",
      color: "color",
    })

    project = newProject.data.dataValues

  }, 100000)


  test("addOne: can add record.", async () => {
    const pageSql = makeBackendProjectPageSql(d)

    const addOne = await pageSql.addOne({
      projectId: project.id,
      slug: "/test/should-not-be-saved/",
      isReady: true,
    })
    record = addOne.data.dataValues

    expect(addOne.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
    expect(addOne.data.dataValues.isReady).toEqual(true)
  })

  test("getManyByProjectId: can get all records.", async () => {
    const pageSql = makeBackendProjectPageSql(d)

    const getMany = await pageSql.getManyByProjectId({
      projectId: project.id,
    })

    expect(getMany.data.length).toBe(1)
  })

  test("getOneById: can get record.", async () => {
    const pageSql = makeBackendProjectPageSql(d)

    const getOneById = await pageSql.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("getOneBySlug: can get record by slug.", async () => {
    const pageSql = makeBackendProjectPageSql(d)

    const getOneBySlug = await pageSql.getOneBySlug({
      projectId: project.id,
      slug: "/test/should-not-be-saved/"
    })

    expect(getOneBySlug.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("getManyWithPagination: can get many with pagination.", async () => {
    const pageSql = makeBackendProjectPageSql(d)

    const getManyWithPagination = await pageSql.getManyWithPagination({
      projectId: project.id,
    })
    expect(getManyWithPagination.data.rows.length).toBeGreaterThan(0)
  })
  
  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

