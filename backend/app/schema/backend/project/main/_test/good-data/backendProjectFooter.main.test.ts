import backendProject from "../../../../../../models/backend/project/backendProject.model"
import backendProjectFooter from "../../../../../../models/backend/project/backendProjectFooter.model"
import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectMain from "../../backendProject.main"
import makeBackendProjectFooterMain from "../../backendProjectFooter.main"

jest.setTimeout(100000)


describe("test backendProjectFooter.main.js", () => {

  let d: dependencies
  let record: backendProjectFooter
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
    const projectFooter = makeBackendProjectFooterMain(d)

    const addOne = await projectFooter.addOne({
      projectId: project.id,

      menuJsonB: JSON.stringify({ testing: "testing" }),
      userAnswersJsonB: JSON.stringify({ testing: "testing" }),
      webAssetImport: "webAssetImport",
      selectionType: SelectionTypeEnum.BUILT_IN,
    })
    record = addOne.data.dataValues

    expect(addOne.data.dataValues.menuJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(addOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(addOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(addOne.data.dataValues.selectionType).toEqual(SelectionTypeEnum.BUILT_IN)

  })

  test("getOneById: can get record.", async () => {
    const projectFooter = makeBackendProjectFooterMain(d)

    const getOneById = await projectFooter.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.menuJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneById.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneById.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  test("getOneByProjectId: can get record.", async () => {
    const projectFooter = makeBackendProjectFooterMain(d)

    const getOneByProjectId = await projectFooter.getOneByProjectId({
      projectId: project.id,
    })

    expect(getOneByProjectId.data.dataValues.menuJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneByProjectId.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneByProjectId.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})

