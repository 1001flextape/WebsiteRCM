import backendProject from "../../../../../models/backend/project/backendProject.model"
import backendProjectBrowser from "../../../../../models/backend/project/backendProjectBrowser.model"
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectSql from "../backendProject.sql"
import makeBackendProjectBrowserSql from "../backendProjectBrowser.sql"

jest.setTimeout(100000)


describe("test backendProjectSite.sql.js", () => {
  let d: dependencies
  let record: backendProjectBrowser
  let project: backendProject

  beforeAll(async () => {

    d = await makeDTestObj()
    
    

    const backendProject = makeBackendProjectSql(d)

    const newProject = await backendProject.addOne({
      name: "Test",
      color: "color",
    })

    project = newProject.data.dataValues

  }, 100000)

  test("addOne: can add record.", async () => {
    const projectBrowser = makeBackendProjectBrowserSql(d)

    const addOne = await projectBrowser.addOne({
      favicon: "favicon",
      tab: "tab",
      projectId: project.id,
    })

    record = addOne.data.dataValues

    expect(addOne.data.dataValues.favicon).toEqual("favicon")
    expect(addOne.data.dataValues.tab).toEqual("tab")

  })

  test("getOneById: can get record.", async () => {
    const projectBrowser = makeBackendProjectBrowserSql(d)

    const getOneById = await projectBrowser.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.favicon).toEqual("favicon")
    expect(getOneById.data.dataValues.tab).toEqual("tab")
  })

  test("getOneByProjectId: can get record.", async () => {
    const projectBrowser = makeBackendProjectBrowserSql(d)

    const getOneById = await projectBrowser.getOneByProjectId({
      projectId: project.id,
    })

    expect(getOneById.data.dataValues.favicon).toEqual("favicon")
    expect(getOneById.data.dataValues.tab).toEqual("tab")
  })
  

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

