import { v4 as uuidv4 } from "uuid";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import makeBackendSiteDesignerPublishMain from "../../backendSiteDesignerPublish.main";
import makeBackendSiteDesignerPageMain from "../../../../page/main/backendSiteDesignerPage.main";
import { SelectionTypeEnum } from "../../../../../../../models/backend/setting/backendSettingHeader.model";
import { PageStatusEnum } from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
jest.setTimeout(100000)

describe("test backendSiteDesignerPublish.main.js", () => {
  let d: dependencies

  beforeAll(async () => {

    d = await makeDTestObj()
    
    //import
    const backendSiteDesignerPage = makeBackendSiteDesignerPageMain(d)

    await backendSiteDesignerPage.addOne({
      isReady: true,
      status: PageStatusEnum.New,
      isRecentlyCreated: true,
      isRecentlyDeleted: true,
      slug: "/slug/publish-test/should-not-be-saved"
    })
    
    await backendSiteDesignerPage.addOne({
      isReady: true,
      status: PageStatusEnum.Draft,
      isRecentlyCreated: true,
      isRecentlyDeleted: true,
      slug: "/slug/publish-test/should-not-be-saved"
    })
    
    await backendSiteDesignerPage.addOne({
      isReady: true,
      status: PageStatusEnum.Published,
      isRecentlyCreated: true,
      isRecentlyDeleted: true,
      slug: "/slug/publish-test/should-not-be-saved"
    })
  }, 100000)

  test("publishSite: can publish site.", async () => {
    // main import
    const publish = makeBackendSiteDesignerPublishMain(d)
    
    // imports
    const backendSiteDesignerPage = makeBackendSiteDesignerPageMain(d)



    // target action being completed.
    // client site namespace gets a data mapping from backend settings/page
    await publish.publishSite()
    
    /////////////////////////////////////
    // page
    // =================================

    const pages = await backendSiteDesignerPage.getMany()
    expect(pages.data.filter(p => p.dataValues.status === PageStatusEnum.Published).length).toBe(2)
    expect(pages.data.filter(p => p.dataValues.status === PageStatusEnum.New).length).toBe(0)
    expect(pages.data.filter(p => p.dataValues.status === PageStatusEnum.Draft).length).toBe(1)

    expect(pages.data.filter(p => p.dataValues.isChanged).length).toBe(0)
    expect(pages.data.filter(p => p.dataValues.isRecentlyCreated).length).toBe(0)
    expect(pages.data.filter(p => p.dataValues.isRecentlyDeleted).length).toBe(0)
    

  })

  afterAll(async () => {
    
    await d.dbTransaction.rollback()
  })
})

