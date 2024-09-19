import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import makeBackendSiteDesignerPublishMain from "../../backendSiteDesignerPublish.main";
import makeBackendProjectMain from "../../../../../project/main/backendProject.main";
jest.setTimeout(100000)

describe("test backendSiteDesignerPublish.main.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()


    const backendProject = makeBackendProjectMain(d)

    // updates
    const project = await backendProject.getCurrentOne()

    recordId = project.data.dataValues.id

  }, 100000)

  test("publishSite: can publish site.", async () => {
    // main import
    const backendProject = makeBackendProjectMain(d)
    const publish = makeBackendSiteDesignerPublishMain(d)
    // imports

    // target action being completed.
    await publish.publishSite()

    // updates
    const project = await backendProject.getOneById({
      id: recordId,
    })

    expect(project.data.dataValues.endedAt).not.toBeNull()

  })

  afterAll(async () => {

    await d.dbTransaction.rollback()
  })
})

