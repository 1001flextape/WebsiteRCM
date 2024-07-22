import backendProject from "../../../../../../../models/subDomain/backend/project/backendProject.model"
import backendProjectFooter from "../../../../../../../models/subDomain/backend/project/backendProjectFooter.model"
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectMain from "../../backendProject.main"
import makeBackendProjectHeaderMain from "../../backendProjectHeader.main"
jest.setTimeout(100000)


describe("test backendProjectHeader.main.js", () => {
 
  let d: dependencies
  let record: backendProjectFooter
  let project: backendProject

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const backendProject = makeBackendProjectMain(d)

    const newProject = await backendProject.addOne({
      name: "Test",
      color: "#f1f4f5",
    })

    project = newProject.data.dataValues

  }, 100000)

  test("addOne: can add record.", async () => {
    const projectHeader = makeBackendProjectHeaderMain(d)

    const addOne = await projectHeader.addOne({
      projectId: project.id,
      menuJsonB: JSON.stringify({testing: "testing"}),
      userAnswersJsonB: JSON.stringify({testing: "testing"}),
      webAssetImport: "webAssetImport",
      isReady: true,
    })
    record = addOne.data.dataValues

    expect(addOne.data.dataValues.projectId).toEqual(project.id)
    expect(addOne.data.dataValues.menuJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(addOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(addOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(addOne.data.dataValues.isReady).toBe(true)

  })

  test("getOneById: can get record.", async () => {
    const projectHeader = makeBackendProjectHeaderMain(d)

    const getOneById = await projectHeader.getOneById({
      id: record.id
    })

    expect(getOneById.data.dataValues.menuJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(getOneById.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(getOneById.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(getOneById.data.dataValues.isReady).toBe(true)
  })

  test("getOneByProjectId: can get record.", async () => {
    const projectHeader = makeBackendProjectHeaderMain(d)

    const getOneByProjectId = await projectHeader.getOneByProjectId({
      projectId: project.id
    })

    expect(getOneByProjectId.data.dataValues.menuJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(getOneByProjectId.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(getOneByProjectId.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(getOneByProjectId.data.dataValues.isReady).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

