import backendProject from "../../../../../../models/backend/project/backendProject.model"
import backendProjectLink from "../../../../../../models/backend/project/backendProjectLink.model"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectMain from "../../backendProject.main"
import makeBackendProjectLinkMain from "../../backendProjectLink.main"
jest.setTimeout(100000)


describe("test backendProjectLink.main.js", () => {

  let d: dependencies
  let record: backendProjectLink
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
    const profileLink = makeBackendProjectLinkMain(d)

    const addOne = await profileLink.addOne({
      projectId: project.id,
      description: "description",
      image: "image",
      title: "title",
    })
    record = addOne.data.dataValues

    expect(addOne.data.dataValues.description).toEqual("description")
    expect(addOne.data.dataValues.image).toEqual("image")
    expect(addOne.data.dataValues.title).toEqual("title")

  })

  test("getOneById: can get record.", async () => {
    const settingLink = makeBackendProjectLinkMain(d)

    const getOneById = await settingLink.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.description).toEqual("description")
    expect(getOneById.data.dataValues.image).toEqual("image")
    expect(getOneById.data.dataValues.title).toEqual("title")
  })

  test("getOneByProjectId: can get record.", async () => {
    const settingLink = makeBackendProjectLinkMain(d)

    const getOneByProjectId = await settingLink.getOneByProjectId({
      projectId: project.id,
    })

    expect(getOneByProjectId.data.dataValues.description).toEqual("description")
    expect(getOneByProjectId.data.dataValues.image).toEqual("image")
    expect(getOneByProjectId.data.dataValues.title).toEqual("title")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

