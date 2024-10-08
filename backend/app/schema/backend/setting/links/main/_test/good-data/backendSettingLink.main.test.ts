import makeBackendSettingLinkMain from "../../backendSettingLink.main"
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendSettingLink.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const settingLink = makeBackendSettingLinkMain(d)

    const updateOne = await settingLink.upsertOne({
      description: "description",
      image: "image",
      title: "title",
      isReady: true,

    })

    expect(updateOne.data.dataValues.description).toEqual("description")
    expect(updateOne.data.dataValues.image).toEqual("image")
    expect(updateOne.data.dataValues.title).toEqual("title")
    expect(updateOne.data.dataValues.isChanged).toBe(true)
    expect(updateOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const settingLink = makeBackendSettingLinkMain(d)

    const getOne = await settingLink.getOne()

    expect(getOne.data.dataValues.description).toEqual("description")
    expect(getOne.data.dataValues.image).toEqual("image")
    expect(getOne.data.dataValues.title).toEqual("title")
    expect(getOne.data.dataValues.isChanged).toBe(true)
    expect(getOne.data.dataValues.isReady).toBe(true)
  })

  test("resetIsChanged: remove is changed flag.", async () => {
    const main = makeBackendSettingLinkMain(d)

    await main.resetIsChanged()
    
    const getOne = await main.getOne()

    expect(getOne.data.dataValues.isChanged).toBe(false)

  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

