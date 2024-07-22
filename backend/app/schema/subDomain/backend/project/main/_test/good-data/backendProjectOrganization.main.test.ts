import backendProjectOrganization from "../../../../../../../models/subDomain/backend/project/backendProjectOrganization.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendProject from "../../../../../../../models/subDomain/backend/project/backendProject.model";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import makeBackendProjectMain from "../../backendProject.main";
import makeBackendProjectOrganizationMain from "../../backendProjectOrganization.main";
jest.setTimeout(100000)

describe("test backkendProjectOrganization.main.js", () => {

  let d: dependencies
  let record: backendProjectOrganization
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
    const projectOrganization = makeBackendProjectOrganizationMain(d)

    const addOne = await projectOrganization.addOne({
      projectId: project.id,
      logo: "logo",
      name: "name",
      addressLine1: "addressLine1",
      addressLine2: "addressLine2",
      cityLocality: "cityLocality",
      postalCode: "postalCode",
      shouldApplyToTopNavMenu: true,
      socialFacebook: "socialFacebook",
      socialInstagram: "socialInstagram",
      socialLinkedIn: "socialLinkedIn",
      socialPinterest: "socialPinterest",
      socialReddit: "socialReddit",
      socialWhatsapp: "socialWhatsapp",
      socialX: "socialX",
      socialYouTube: "socialYouTube",
      stateProvinceRegion: "stateProvinceRegion",
    })
    record = addOne.data.dataValues

    expect(addOne.data.dataValues.logo).toEqual("logo")
    expect(addOne.data.dataValues.name).toEqual("name")
    expect(addOne.data.dataValues.addressLine1).toEqual("addressLine1")
    expect(addOne.data.dataValues.addressLine2).toEqual("addressLine2")
    expect(addOne.data.dataValues.cityLocality).toEqual("cityLocality")
    expect(addOne.data.dataValues.shouldApplyToTopNavMenu).toBe(true)
    expect(addOne.data.dataValues.socialFacebook).toEqual("socialFacebook")
    expect(addOne.data.dataValues.socialInstagram).toEqual("socialInstagram")
    expect(addOne.data.dataValues.socialLinkedIn).toEqual("socialLinkedIn")
    expect(addOne.data.dataValues.socialPinterest).toEqual("socialPinterest")
    expect(addOne.data.dataValues.socialReddit).toEqual("socialReddit")
    expect(addOne.data.dataValues.socialWhatsapp).toEqual("socialWhatsapp")
    expect(addOne.data.dataValues.socialX).toEqual("socialX")
    expect(addOne.data.dataValues.socialYouTube).toEqual("socialYouTube")
    expect(addOne.data.dataValues.stateProvinceRegion).toEqual("stateProvinceRegion")
  })

  test("getOneById: can get record.", async () => {
    const projectOrganization = makeBackendProjectOrganizationMain(d)

    const getOneById = await projectOrganization.getOneById({
      id: record.id,
    })

    expect(getOneById.data.dataValues.logo).toEqual("logo")
    expect(getOneById.data.dataValues.name).toEqual("name")
    expect(getOneById.data.dataValues.addressLine1).toEqual("addressLine1")
    expect(getOneById.data.dataValues.addressLine2).toEqual("addressLine2")
    expect(getOneById.data.dataValues.cityLocality).toEqual("cityLocality")
    expect(getOneById.data.dataValues.shouldApplyToTopNavMenu).toBe(true)
    expect(getOneById.data.dataValues.socialFacebook).toEqual("socialFacebook")
    expect(getOneById.data.dataValues.socialInstagram).toEqual("socialInstagram")
    expect(getOneById.data.dataValues.socialLinkedIn).toEqual("socialLinkedIn")
    expect(getOneById.data.dataValues.socialPinterest).toEqual("socialPinterest")
    expect(getOneById.data.dataValues.socialReddit).toEqual("socialReddit")
    expect(getOneById.data.dataValues.socialWhatsapp).toEqual("socialWhatsapp")
    expect(getOneById.data.dataValues.socialX).toEqual("socialX")
    expect(getOneById.data.dataValues.socialYouTube).toEqual("socialYouTube")
    expect(getOneById.data.dataValues.stateProvinceRegion).toEqual("stateProvinceRegion")
  })

  test("getOneByProjectId: can get record.", async () => {
    const projectOrganization = makeBackendProjectOrganizationMain(d)

    const getOneByProjectId = await projectOrganization.getOneByProjectId({
      projectId: project.id,
    })

    expect(getOneByProjectId.data.dataValues.logo).toEqual("logo")
    expect(getOneByProjectId.data.dataValues.name).toEqual("name")
    expect(getOneByProjectId.data.dataValues.addressLine1).toEqual("addressLine1")
    expect(getOneByProjectId.data.dataValues.addressLine2).toEqual("addressLine2")
    expect(getOneByProjectId.data.dataValues.cityLocality).toEqual("cityLocality")
    expect(getOneByProjectId.data.dataValues.shouldApplyToTopNavMenu).toBe(true)
    expect(getOneByProjectId.data.dataValues.socialFacebook).toEqual("socialFacebook")
    expect(getOneByProjectId.data.dataValues.socialInstagram).toEqual("socialInstagram")
    expect(getOneByProjectId.data.dataValues.socialLinkedIn).toEqual("socialLinkedIn")
    expect(getOneByProjectId.data.dataValues.socialPinterest).toEqual("socialPinterest")
    expect(getOneByProjectId.data.dataValues.socialReddit).toEqual("socialReddit")
    expect(getOneByProjectId.data.dataValues.socialWhatsapp).toEqual("socialWhatsapp")
    expect(getOneByProjectId.data.dataValues.socialX).toEqual("socialX")
    expect(getOneByProjectId.data.dataValues.socialYouTube).toEqual("socialYouTube")
    expect(getOneByProjectId.data.dataValues.stateProvinceRegion).toEqual("stateProvinceRegion")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

