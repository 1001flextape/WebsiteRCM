import backendProject from "../../../../../models/backend/project/backendProject.model";
import backendProjectPage from "../../../../../models/backend/project/backendProjectPage.model";
import backendProjectPageBrowser from "../../../../../models/backend/project/backendProjectPageBrowser.model";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendProjectSql from "../backendProject.sql";
import makeBackendProjectPageSql from "../backendProjectPage.sql";
import makeBackendProjectPageBrowserSql from "../backendProjectPageBrowser.sql";
jest.setTimeout(100000)


describe("test backendProjectPageBrowser.sql.js", () => {

  let d: dependencies
  let record: backendProjectPageBrowser
  let project: backendProject
  let page: backendProjectPage

  beforeAll(async () => {

    d = await makeDTestObj()
    
    

    const backendProject = makeBackendProjectSql(d)
    const backendProjectPage = makeBackendProjectPageSql(d)

    const newProject = await backendProject.addOne({
      name: "Test",
      color: "color",
    })

    project = newProject.data.dataValues

    const newPage = await backendProjectPage.addOne({
      projectId: project.id,
      slug: "/test/shouldnt-save",
    })

    page = newPage.data.dataValues

  }, 100000)


  test("addOne: can add record.", async () => {
    const sql = makeBackendProjectPageBrowserSql(d)

    const addOne = await sql.addOne({
      projectId: project.id,
      pageId: page.id,
      tabName: "blah",
    })
    record = addOne.data.dataValues

    expect(addOne.data.dataValues.pageId).toEqual(page.id)
    expect(addOne.data.dataValues.tabName).toEqual("blah")
  })

  test("getOneById: can get record.", async () => {
    const pageBrowserSql = makeBackendProjectPageBrowserSql(d)

    const getOneById = await pageBrowserSql.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.pageId).toEqual(page.id)
    expect(getOneById.data.dataValues.tabName).toEqual("blah")
  })

  test("getOneByPageId: can get record.", async () => {
    const pageBrowserSql = makeBackendProjectPageBrowserSql(d)

    const getOneByPageId = await pageBrowserSql.getOneByPageId({
      pageId: page.id,
    })

    expect(getOneByPageId.data.dataValues.pageId).toEqual(page.id)
    expect(getOneByPageId.data.dataValues.tabName).toEqual("blah")
  })

  test("addMany: can add many records.", async () => {
    const pageBrowserSql = makeBackendProjectPageBrowserSql(d)    
    const backendProjectPage = makeBackendProjectPageSql(d)

    const newPage2 = await backendProjectPage.addOne({
      projectId: project.id,
      slug: "/test/shouldnt-save/123980-12038-test",
    })

    await pageBrowserSql.addMany([{
      projectId: project.id,
      pageId: newPage2.data.dataValues.id,
    }])

    const getMany = await pageBrowserSql.getManyByProjectId({
      projectId: project.id,
    })
                                              // there is at least 2, planning on possibly seeding data later
    expect(getMany.data.length).toBeGreaterThan(1)
  })
  
  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

