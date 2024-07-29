import backendProject from "../../../../../../models/backend/project/backendProject.model"
import backendProjectBrowser from "../../../../../../models/backend/project/backendProjectBrowser.model"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectMain from "../../backendProject.main"
import makeBackendProjectBrowserMain from "../../backendProjectBrowser.main"

jest.setTimeout(100000)


describe("test backendProjectSite.main.js", () => {
  let d: dependencies
  let record: backendProjectBrowser
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
    const projectBrowser = makeBackendProjectBrowserMain(d)

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
    const projectBrowser = makeBackendProjectBrowserMain(d)

    const getOneById = await projectBrowser.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.favicon).toEqual("favicon")
    expect(getOneById.data.dataValues.tab).toEqual("tab")
  })

  test("getOneByProjectId: can get record.", async () => {
    const projectBrowser = makeBackendProjectBrowserMain(d)

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

