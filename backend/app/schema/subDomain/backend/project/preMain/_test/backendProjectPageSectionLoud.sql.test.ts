import backendProject from "../../../../../../models/subDomain/backend/project/backendProject.model";
import backendProjectPage from "../../../../../../models/subDomain/backend/project/backendProjectPage.model";
import backendProjectPageSectionLoud from "../../../../../../models/subDomain/backend/project/backendProjectPageSectionLoud.model";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendProjectSql from "../backendProject.sql";
import makeBackendProjectPageSql from "../backendProjectPage.sql";
import makeBackendProjectPageSectionLoudSql from "../backendProjectPageSectionLoud.sql";
jest.setTimeout(100000)


describe("test backendProjectPageSectionLoud.sql.js", () => {

  let d: dependencies
  let record: backendProjectPageSectionLoud
  let project: backendProject
  let page: backendProjectPage

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const backendProject = makeBackendProjectSql(d)
    const backendProjectPage = makeBackendProjectPageSql(d)

    const newProject = await backendProject.addOne({
      name: "Test",
      color: "color",
    })

    project = newProject.data.dataValues

    const newPage = await backendProjectPage.addOne({
      projectId: project.id,
      slug: "/test/shouldnt-save",
    })

    page = newPage.data.dataValues

  }, 100000)


  test("addOne: can add record.", async () => {
    const sql = makeBackendProjectPageSectionLoudSql(d)

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
    const pageSql = makeBackendProjectPageSectionLoudSql(d)

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

  test("getOneByPageId: can get record.", async () => {
    const pageSql = makeBackendProjectPageSectionLoudSql(d)

    const getOneByPageId = await pageSql.getOneByPageId({
      pageId: page.id,
    })

    expect(getOneByPageId.data.dataValues.pageId).toEqual(page.id)
    expect(getOneByPageId.data.dataValues.author).toEqual("author")
    expect(getOneByPageId.data.dataValues.menuJsonB).toEqual('{"test":"test"}')
    expect(getOneByPageId.data.dataValues.userAnswersJsonB).toEqual('{"test":"test"}')
    expect(getOneByPageId.data.dataValues.name).toEqual("name")
    expect(getOneByPageId.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

