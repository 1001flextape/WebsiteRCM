import backendProject from "../../../../../../models/backend/project/backendProject.model"
import backendProjectBackgroundColor from "../../../../../../models/backend/project/backendProjectBackgroundColor.model"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectMain from "../../backendProject.main"
import makeBackendProjectBackgroundColorMain from "../../backendProjectBackgroundColor.main"
jest.setTimeout(100000)


describe("test backendProjectBackgroundColor.main.js", () => {

  let d: dependencies
  let record: backendProjectBackgroundColor
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
    const profileBackgroundColor = makeBackendProjectBackgroundColorMain(d)

    const addOne = await profileBackgroundColor.addOne({
      projectId: project.id,

      backgroundColor_day: "backgroundColor_day",
      backgroundColor_night: "backgroundColor_night",
    })
    record = addOne.data.dataValues

    expect(addOne.data.dataValues.backgroundColor_day).toEqual("backgroundColor_day")
    expect(addOne.data.dataValues.backgroundColor_night).toEqual("backgroundColor_night")

  })

  test("getOneById: can get record.", async () => {
    const settingBackgroundColor = makeBackendProjectBackgroundColorMain(d)

    const getOneById = await settingBackgroundColor.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.backgroundColor_day).toEqual("backgroundColor_day")
    expect(getOneById.data.dataValues.backgroundColor_night).toEqual("backgroundColor_night")

  })

  test("getOneByProjectId: can get record.", async () => {
    const settingBackgroundColor = makeBackendProjectBackgroundColorMain(d)

    const getOneByProjectId = await settingBackgroundColor.getOneByProjectId({
      projectId: project.id,
    })

    expect(getOneByProjectId.data.dataValues.backgroundColor_day).toEqual("backgroundColor_day")
    expect(getOneByProjectId.data.dataValues.backgroundColor_night).toEqual("backgroundColor_night")

  })

  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})

