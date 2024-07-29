import backendProject from "../../../../../../models/backend/project/backendProject.model"
import backendProjectPage from "../../../../../../models/backend/project/backendProjectPage.model"
import backendProjectPageBrowser from "../../../../../../models/backend/project/backendProjectPageBrowser.model"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectSql from "../../../preMain/backendProject.sql"
import makeBackendProjectPageSql from "../../../preMain/backendProjectPage.sql"
import makeBackendProjectPageBrowserSql from "../../../preMain/backendProjectPageBrowser.sql"

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
      color: "#f1f4f5",
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
    const pageSql = makeBackendProjectPageBrowserSql(d)

    const getOneById = await pageSql.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.pageId).toEqual(page.id)
    expect(getOneById.data.dataValues.tabName).toEqual("blah")
  })

  test("getOneByPageId: can get record.", async () => {
    const pageSql = makeBackendProjectPageBrowserSql(d)

    const getOneByPageId = await pageSql.getOneByPageId({
      pageId: page.id,
    })

    expect(getOneByPageId.data.dataValues.pageId).toEqual(page.id)
    expect(getOneByPageId.data.dataValues.tabName).toEqual("blah")
  })

  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})

