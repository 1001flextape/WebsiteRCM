import backendProject from "../../../../../../models/backend/project/backendProject.model"
import backendProjectPage from "../../../../../../models/backend/project/backendProjectPage.model"
import backendProjectPageSectionNormal from "../../../../../../models/backend/project/backendProjectPageSectionNormal.model"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectSql from "../../../preMain/backendProject.sql"
import makeBackendProjectPageSql from "../../../preMain/backendProjectPage.sql"
import makeBackendProjectPageSectionNormalSql from "../../../preMain/backendProjectPageSectionNormal.sql"

jest.setTimeout(100000)


describe("test backendProjectPageSectionNormal.sql.js", () => {

  let d: dependencies
  let record: backendProjectPageSectionNormal
  let project: backendProject
  let page: backendProjectPage

  beforeAll(async () => {

    d = await makeDTestObj()
    
    

    const backendProject = makeBackendProjectSql(d)
    const backendProjectPage = makeBackendProjectPageSql(d)

    const newProject = await backendProject.addOne({
      name: "Test",
      color: "#f1f4f5",
    })

    project = newProject.data.dataValues

    const newPage = await backendProjectPage.addOne({
      projectId: project.id,
      slug: "/test/shouldnt-save",
    })

    page = newPage.data.dataValues

  }, 100000)


  test("addOne: can add record.", async () => {
    const sql = makeBackendProjectPageSectionNormalSql(d)

    const addOne = await sql.addOne({

      projectId: project.id,
      pageId: page.id,
      author: "author",
      menuJsonB: '{"test":"test"}',
      userAnswersJsonB: '{"test":"test"}',
      name: "name",
      webAssetImport: "webAssetImport",
    })
    record = addOne.data.dataValues

    expect(addOne.data.dataValues.pageId).toEqual(page.id)
    expect(addOne.data.dataValues.author).toEqual("author")
    expect(addOne.data.dataValues.menuJsonB).toEqual('{"test":"test"}')
    expect(addOne.data.dataValues.userAnswersJsonB).toEqual('{"test":"test"}')
    expect(addOne.data.dataValues.name).toEqual("name")
    expect(addOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  test("getOneById: can get record.", async () => {
    const pageSql = makeBackendProjectPageSectionNormalSql(d)

    const getOneById = await pageSql.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.pageId).toEqual(page.id)
    expect(getOneById.data.dataValues.author).toEqual("author")
    expect(getOneById.data.dataValues.menuJsonB).toEqual('{"test":"test"}')
    expect(getOneById.data.dataValues.userAnswersJsonB).toEqual('{"test":"test"}')
    expect(getOneById.data.dataValues.name).toEqual("name")
    expect(getOneById.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  test("getManyByPageId: can get record.", async () => {
    const pageSql = makeBackendProjectPageSectionNormalSql(d)

    const getManyByPageId = await pageSql.getManyByPageId({
      pageId: page.id,
    })

    expect(getManyByPageId.data.length).toBe(1)
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

