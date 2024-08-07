import backendProject from "../../../../../../models/backend/project/backendProject.model"
import backendProjectFont from "../../../../../../models/backend/project/backendProjectFont.model"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectMain from "../../backendProject.main"
import makeBackendProjectFontMain from "../../backendProjectFont.main"

jest.setTimeout(100000)


describe("test backendProjectSite.main.js", () => {
  let d: dependencies
  let record: backendProjectFont
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
    const projectFont = makeBackendProjectFontMain(d)

    const addOne = await projectFont.addOne({
      projectId: project.id,
      font: "font",
    })

    record = addOne.data.dataValues

    expect(addOne.data.dataValues.font).toEqual("font")

  })

  test("getOneById: can get record.", async () => {
    const projectFont = makeBackendProjectFontMain(d)

    const getOneById = await projectFont.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.font).toEqual("font")
  })

  test("getOneByProjectId: can get record.", async () => {
    const projectFont = makeBackendProjectFontMain(d)

    const getOneByProjectId = await projectFont.getOneByProjectId({
      projectId: project.id,
    })

    expect(getOneByProjectId.data.dataValues.font).toEqual("font")
  })


  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})

