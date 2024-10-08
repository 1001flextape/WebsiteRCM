import backendProject from "../../../../../../models/backend/project/backendProject.model"
import backendProjectPage from "../../../../../../models/backend/project/backendProjectPage.model"
import backendProjectPageLink from "../../../../../../models/backend/project/backendProjectPageLink.model"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendProjectSql from "../../../preMain/backendProject.sql"
import makeBackendProjectPageSql from "../../../preMain/backendProjectPage.sql"
import makeBackendProjectPageLinkSql from "../../../preMain/backendProjectPageLink.sql"
import makeBackendProjectPageMain from "../../backendProjectPage.main"

jest.setTimeout(100000)


describe("test backendProjectPageLink.sql.js", () => {

  let d: dependencies
  let record: backendProjectPageLink
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

  test("addMany: can add many records.", async () => {
    const pageLinkMain = makeBackendProjectPageLinkSql(d)    
    const backendProjectPage = makeBackendProjectPageMain(d)

    const newPage2 = await backendProjectPage.addOne({
      projectId: project.id,
      slug: "/test/shouldnt-save/123980-12038-test",
    })

    await pageLinkMain.addMany([{
      projectId: project.id,
      pageId: newPage2.data.dataValues.id,
    }])

    const getMany = await pageLinkMain.getManyByProjectId({
      projectId: project.id,
    })
                                              // there is at least 2, planning on possibly seeding data later
    expect(getMany.data.length).toBeGreaterThan(1)
  })

  afterAll(async () => {
    await d.dbTransaction.rollback()
  })
})

