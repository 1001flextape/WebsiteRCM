import makeBackendSiteDesignerPageSql from "../backendSiteDesignerPage.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
jest.setTimeout(100000)


describe("test backendSiteDesignerPage.sql.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    
  }, 100000)

  test("addOne: can add record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const addOne = await pageSql.addOne({
      slug: "/test/should-not-be-saved/",
      isReady: true,
      isChanged: true,
      status: PageStatusEnum.New,
      isRecentlyCreated: true,
      isRecentlyDeleted: true,
    })
    recordId = addOne.data.dataValues.id

    expect(addOne.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
    expect(addOne.data.dataValues.isReady).toEqual(true)
    expect(addOne.data.dataValues.isChanged).toEqual(true)    
    expect(addOne.data.dataValues.status).toEqual(PageStatusEnum.New)
    expect(addOne.data.dataValues.isRecentlyCreated).toEqual(true)
    expect(addOne.data.dataValues.isRecentlyDeleted).toEqual(true)
  })

  test("getMany: can get all records.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const getMany = await pageSql.getMany()

    expect(getMany.data.length).toBe(1)
  })

  test("getOneById: can get record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const getOneById = await pageSql.getOneById({
      id: recordId,
    })

    expect(getOneById.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("getOneBySlug: can get record by slug.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const getOneBySlug = await pageSql.getOneBySlug({
      slug: "/test/should-not-be-saved/"
    })

    expect(getOneBySlug.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("resetRecentlyCreated: will mark documents not as recently created.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    await pageSql.resetRecentlyCreated()

    const getOneById = await pageSql.getOneById({
      id: recordId,
    })
    
    expect(getOneById.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
    expect(getOneById.data.dataValues.isReady).toEqual(true)
    expect(getOneById.data.dataValues.isChanged).toEqual(true)
    expect(getOneById.data.dataValues.status).toEqual(PageStatusEnum.New)
    expect(getOneById.data.dataValues.isRecentlyCreated).toEqual(false)
    expect(getOneById.data.dataValues.isRecentlyDeleted).toEqual(true)
  })
 
  test("updateOne: can update record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const updatePage = await pageSql.updateOne({
      id: recordId,
      slug: "/tested/updated/",
      isReady: true,
      status: PageStatusEnum.Draft,
    })
    expect(updatePage.data.dataValues.slug).toEqual("/tested/updated/")
    expect(updatePage.data.dataValues.isReady).toEqual(true)
    expect(updatePage.data.dataValues.status).toEqual(PageStatusEnum.Draft)
  })

  test("getManyWithPagination: can get many with pagination.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const getManyWithPagination = await pageSql.getManyWithPagination({})
    expect(getManyWithPagination.data.rows.length).toBeGreaterThan(0)
  })
  
  test("deleteOne: backendSiteDesignerPages can delete record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const deleteOne = await pageSql.deleteOne({
      id: recordId,
    })

    expect(deleteOne.success).toBe(true)
  })

  test("getOneById: double check for deleted record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const getOneById = await pageSql.getOneById({
      id: recordId,
    })

    expect(getOneById.data).toBe(null)
  })
  
  test("resetRecentlyDeleted: will mark documents not as recently deleted.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const getDeletedOneById = await pageSql.getDeletedOneById({
      id: recordId,
    })
    expect(getDeletedOneById.data.dataValues.isRecentlyDeleted).toEqual(true)

    await pageSql.resetRecentlyDeleted()

    const getDeletedOneById2 = await pageSql.getDeletedOneById({
      id: recordId,
    })
    expect(getDeletedOneById2.data.dataValues.isRecentlyDeleted).toEqual(false)
  })


  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

