import backendProject from "../../../../../../../models/subDomain/backend/project/backendProject.model"
import backendProjectPage from "../../../../../../../models/subDomain/backend/project/backendProjectPage.model"
import backendProjectPageLink from "../../../../../../../models/subDomain/backend/project/backendProjectPageLink.model"
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectSql from "../../../preMain/backendProject.sql"
import makeBackendProjectPageSql from "../../../preMain/backendProjectPage.sql"
import makeBackendProjectPageLinkSql from "../../../preMain/backendProjectPageLink.sql"

jest.setTimeout(100000)


describe("test backendProjectPageLink.sql.js", () => {

  let d: dependencies
  let record: backendProjectPageLink
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
      color: "#f1f4f5",
    })

    project = newProject.data.dataValues

    const newPage = await backendProjectPage.addOne({
      projectId: project.id,
      slug: "/test/shouldnt-save",
      isReady: false,
    })

    page = newPage.data.dataValues

  }, 100000)


  test("addOne: can add record.", async () => {
    const sql = makeBackendProjectPageLinkSql(d)

    const addOne = await sql.addOne({
      projectId: project.id,
      pageId: page.id,
      description: "description",
      picture: "picture",
      pictureAlt: "pictureAlt",
      title: "title"
    })
    record = addOne.data.dataValues

    expect(addOne.data.dataValues.pageId).toEqual(page.id)
    expect(addOne.data.dataValues.description).toEqual("description")
    expect(addOne.data.dataValues.picture).toEqual("picture")
    expect(addOne.data.dataValues.pictureAlt).toEqual("pictureAlt")
    expect(addOne.data.dataValues.title).toEqual("title")
  })

  test("getOneById: can get record.", async () => {
    const pageSql = makeBackendProjectPageLinkSql(d)

    const getOneById = await pageSql.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.pageId).toEqual(page.id)
    expect(getOneById.data.dataValues.description).toEqual("description")
    expect(getOneById.data.dataValues.picture).toEqual("picture")
    expect(getOneById.data.dataValues.pictureAlt).toEqual("pictureAlt")
    expect(getOneById.data.dataValues.title).toEqual("title")
  })

  test("getOneByPageId: can get record.", async () => {
    const pageSql = makeBackendProjectPageLinkSql(d)

    const getOneByPageId = await pageSql.getOneByPageId({
      pageId: page.id,
    })

    expect(getOneByPageId.data.dataValues.pageId).toEqual(page.id)
    expect(getOneByPageId.data.dataValues.description).toEqual("description")
    expect(getOneByPageId.data.dataValues.picture).toEqual("picture")
    expect(getOneByPageId.data.dataValues.pictureAlt).toEqual("pictureAlt")
    expect(getOneByPageId.data.dataValues.title).toEqual("title")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

