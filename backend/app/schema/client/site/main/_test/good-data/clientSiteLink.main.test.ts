import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSiteLinkMain from "../../clientSiteLink.main"

jest.setTimeout(100000)


describe("test clientSiteLink.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    
    

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const settingLink = makeClientSiteLinkMain(d)

    const updateOne = await settingLink.upsertOne({
      description: "description",
      image: "image",
      title: "title",

    })

    expect(updateOne.data.dataValues.description).toEqual("description")
    expect(updateOne.data.dataValues.image).toEqual("image")
    expect(updateOne.data.dataValues.title).toEqual("title")

  })

  test("getOne: can get record.", async () => {
    const settingLink = makeClientSiteLinkMain(d)

    const getOne = await settingLink.getOne()

    expect(getOne.data.dataValues.description).toEqual("description")
    expect(getOne.data.dataValues.image).toEqual("image")
    expect(getOne.data.dataValues.title).toEqual("title")
  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

