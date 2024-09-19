import makeBackendSiteDesignerPageMain from "../../backendSiteDesignerPage.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { PageStatusEnum } from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
jest.setTimeout(100000)


describe("test backendSiteDesignerPage.main.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    
  }, 100000)

  test("addOne: can add record.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const addOne = await pageMain.addOne({
      slug: "/test/should-not-be-saved/",
      isReady: true,
      status: PageStatusEnum.New,
    })
    recordId = addOne.data.dataValues.id

    expect(addOne.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
    expect(addOne.data.dataValues.isReady).toEqual(true)
    expect(addOne.data.dataValues.status).toEqual(PageStatusEnum.New)
  })

  test("getMany: can get all records.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const getMany = await pageMain.getMany()

    expect(getMany.data.length).toBe(1)
  })

  test("getManyPublishable: can get all records.", async () => {
    const main = makeBackendSiteDesignerPageMain(d)

    const getManyPublishable = await main.getManyPublishable()

    expect(getManyPublishable.data.length).toBe(1)
  })

  test("getOneById: can get record.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const getOneById = await pageMain.getOneById({
      id: recordId,
    })

    expect(getOneById.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("getOneBySlug: can get record by slug.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const getOneBySlug = await pageMain.getOneBySlug({
      slug: "/test/should-not-be-saved/"
    })

    expect(getOneBySlug.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("updateOne: can update record.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const updatePage = await pageMain.updateOne({
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
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const getManyWithPagination = await pageMain.getManyWithPagination({})
    expect(getManyWithPagination.data.rows.length).toBeGreaterThan(0)
  })
  
  test("deleteOne: backendSiteDesignerPages can delete record.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const deleteOne = await pageMain.deleteOne({
      id: recordId,
    })

    expect(deleteOne.success).toBe(true)
  })

  test("getOneById: double check for deleted record.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const getOneById = await pageMain.getOneById({
      id: recordId,
    })

    expect(getOneById.data).toBe(null)
  })
  
  // updateMany: can update multiple records.
  test("updateMany: can update multiple records.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    await pageMain.addOne({
      slug: "/test/should-not-be-saved3/",
      isReady: true,
      isChanged: false,
      status: PageStatusEnum.New,
      isRecentlyCreated: true,
      isRecentlyDeleted: false,
    })
    
    await pageMain.addOne({
      slug: "/test/should-not-be-saved2/",
      isReady: true,
      isChanged: true,
      status: PageStatusEnum.Draft,
      isRecentlyCreated: true,
      isRecentlyDeleted: true,
    })


    const updateMany1 = await pageMain.updateMany({
      where: null,
      isRecentlyCreated: false
    })

    expect(updateMany1.success).toBe(false)
    expect(updateMany1.data).toBeNull()

    //sudo

    // I will change the "status new" to "status published"
    await pageMain.updateMany({
      where: {
        status: PageStatusEnum.New,
      },
      status: PageStatusEnum.Published,
    })

    const getMany2 = await pageMain.getMany()

    expect(getMany2.data.filter(f => f.dataValues.status === PageStatusEnum.New).length).toBe(0)
    expect(getMany2.data.filter(f => f.dataValues.status === PageStatusEnum.Draft).length).toBe(1)
    expect(getMany2.data.filter(f => f.dataValues.status === PageStatusEnum.Published).length).toBe(1)


    // I will be resetting all "isChanged", "isRecentlyCreated", "isRecentlyDeleted"
    await pageMain.updateMany({
      where: {},
      paranoid: false,
      isChanged: false,
      isRecentlyCreated: false,
      isRecentlyDeleted: false,
    })


    const getMany3 = await d.db.models.backendSiteDesignerPage.findAll({
      transaction: d.dbTransaction,
      paranoid: false,
    })

    expect(getMany3.filter(f => f.dataValues.isChanged === true).length).toBe(0)
    expect(getMany3.filter(f => f.dataValues.isChanged === false).length).toBe(3)
    expect(getMany3.filter(f => f.dataValues.isRecentlyCreated === true).length).toBe(0)
    expect(getMany3.filter(f => f.dataValues.isRecentlyCreated === false).length).toBe(3)
    expect(getMany3.filter(f => f.dataValues.isRecentlyDeleted === true).length).toBe(0)
    expect(getMany3.filter(f => f.dataValues.isRecentlyDeleted === false).length).toBe(3)
  })


  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

