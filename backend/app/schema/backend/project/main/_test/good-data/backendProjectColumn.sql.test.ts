import backendProject from "../../../../../../models/backend/project/backendProject.model"
import backendProjectColumn from "../../../../../../models/backend/project/backendProjectColumn.model"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectMain from "../../backendProject.main"
import makeBackendProjectColumnMain from "../../backendProjectColumn.main"

jest.setTimeout(100000)


describe("test backendProjectSite.main.js", () => {
  let d: dependencies
  let record: backendProjectColumn
  let project: backendProject

  beforeAll(async () => {

    d = await makeDTestObj()
    

    const backendProject = makeBackendProjectMain(d)

    const newProject = await backendProject.addOne({
      name: "Test",
      color: "color",
    })

    project = newProject.data.dataValues

  }, 100000)

  test("addOne: can add record.", async () => {
    const projectColumn = makeBackendProjectColumnMain(d)

    const addOne = await projectColumn.addOne({
      projectId: project.id,
      width: "width",
    })

    record = addOne.data.dataValues

    expect(addOne.data.dataValues.width).toEqual("width")

  })

  test("getOneById: can get record.", async () => {
    const projectColumn = makeBackendProjectColumnMain(d)

    const getOneById = await projectColumn.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.width).toEqual("width")
  })

  test("getOneByProjectId: can get record.", async () => {
    const projectColumn = makeBackendProjectColumnMain(d)

    const getOneByProjectId = await projectColumn.getOneByProjectId({
      projectId: project.id,
    })

    expect(getOneByProjectId.data.dataValues.width).toEqual("width")
  })


  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})

