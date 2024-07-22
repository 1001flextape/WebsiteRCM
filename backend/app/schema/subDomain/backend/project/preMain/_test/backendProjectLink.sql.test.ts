import backendProject from "../../../../../../models/subDomain/backend/project/backendProject.model"
import backendProjectLink from "../../../../../../models/subDomain/backend/project/backendProjectLink.model"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectSql from "../backendProject.sql"
import makeBackendProjectLinkSql from "../backendProjectLink.sql"
jest.setTimeout(100000)


describe("test backendProjectLink.sql.js", () => {

  let d: dependencies
  let record: backendProjectLink
  let project: backendProject

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const backendProject = makeBackendProjectSql(d)

    const newProject = await backendProject.addOne({
      name: "Test",
      color: "color",
    })

    project = newProject.data.dataValues

  }, 100000)

  test("addOne: can add record.", async () => {
    const profileLink = makeBackendProjectLinkSql(d)

    const addOne = await profileLink.addOne({
      projectId: project.id,
      description: "description",
      image: "image",
      title: "title",
      isReady: true,
    })
    record = addOne.data.dataValues

    expect(addOne.data.dataValues.description).toEqual("description")
    expect(addOne.data.dataValues.image).toEqual("image")
    expect(addOne.data.dataValues.title).toEqual("title")
    expect(addOne.data.dataValues.isReady).toBe(true)

  })

  test("getOneById: can get record.", async () => {
    const settingLink = makeBackendProjectLinkSql(d)

    const getOneById = await settingLink.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.description).toEqual("description")
    expect(getOneById.data.dataValues.image).toEqual("image")
    expect(getOneById.data.dataValues.title).toEqual("title")
    expect(getOneById.data.dataValues.isReady).toBe(true)
  })

  test("getOneByProjectId: can get record.", async () => {
    const settingLink = makeBackendProjectLinkSql(d)

    const getOneByProjectId = await settingLink.getOneByProjectId({
      projectId: project.id,
    })

    expect(getOneByProjectId.data.dataValues.description).toEqual("description")
    expect(getOneByProjectId.data.dataValues.image).toEqual("image")
    expect(getOneByProjectId.data.dataValues.title).toEqual("title")
    expect(getOneByProjectId.data.dataValues.isReady).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

