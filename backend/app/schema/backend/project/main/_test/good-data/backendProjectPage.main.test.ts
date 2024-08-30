import backendProject from "../../../../../../models/backend/project/backendProject.model";
import backendProjectPage from "../../../../../../models/backend/project/backendProjectPage.model";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendProjectMain from "../../backendProject.main";
import makeBackendProjectPageMain from "../../backendProjectPage.main";
jest.setTimeout(100000)


describe("test backendProjectPage.main.js", () => {

  let d: dependencies
  let record: backendProjectPage
  let project: backendProject

  beforeAll(async () => {

    d = await makeDTestObj()
    

    const backendProject = makeBackendProjectMain(d)

    const newProject = await backendProject.addOne({
      name: "Test",
      color: "#f1f4f5",
    })

    project = newProject.data.dataValues

  }, 100000)


  test("addOne: can add record.", async () => {
    const pageMain = makeBackendProjectPageMain(d)

    const addOne = await pageMain.addOne({
      projectId: project.id,
      slug: "/test/should-not-be-saved/",
      status: PageStatusEnum.New,
    })
    record = addOne.data.dataValues

    expect(addOne.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
    expect(addOne.data.dataValues.status).toEqual(PageStatusEnum.New)
  })

  test("getManyWithPagination: can get all records.", async () => {
    const pageMain = makeBackendProjectPageMain(d)

    const getMany = await pageMain.getManyWithPagination({
      projectId: project.id,
    })

    expect(getMany.data.rows.length).toBe(1)
  })

  test("getOneById: can get record.", async () => {
    const pageMain = makeBackendProjectPageMain(d)

    const getOneById = await pageMain.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("getOneBySlug: can get record by slug.", async () => {
    const pageMain = makeBackendProjectPageMain(d)

    const getOneBySlug = await pageMain.getOneBySlug({
      projectId: project.id,
      slug: "/test/should-not-be-saved/"
    })

    expect(getOneBySlug.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})

