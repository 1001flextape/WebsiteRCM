import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSettingBackgroundColorMain from "../../../../backgroundColor/main/backendSettingBackgroundColor.main";
import makeBackendSettingColorsMain from "../../../../colors/main/backendSettingColors.main";
import makeBackendSettingColumnMain from "../../../../column/main/backendSettingColumn.main";
import makeBackendSettingFontMain from "../../../../font/main/backendSettingFont.main";
import makeBackendSettingFooterMain from "../../../../footer/main/backendSettingFooter.main";
import makeBackendSettingHeaderMain from "../../../../header/main/backendSettingHeader.main";
import makeBackendSettingLinkMain from "../../../../links/main/backendSettingLink.main";
import makeBackendSettingOrganizationMain from "../../../../organization/main/backendSettingOrganization.main";
import makeBackendSettingSiteMain from "../../../../site/main/backendSettingSite.main";
import makeBackendSettingAllMain from "../../backendSettingAll.main";
jest.setTimeout(100000)


describe("test backendSettingAll.main.js", () => {
  let d: dependencies

  beforeAll(async () => {

    d = await makeDTestObj()

  }, 100000)

  test("isWebsiteSettingReady: is not Ready.", async () => {
    const settingAll = makeBackendSettingAllMain(d)

    const isWebsiteSettingReady = await settingAll.isWebsiteSettingReady()

    expect(isWebsiteSettingReady.result).toBe(false)
  })

  test("isWebsiteSettingReady: is Ready.", async () => {    
    const settingColorMain = makeBackendSettingColorsMain(d);
    const settingBackgroundcolorMain = makeBackendSettingBackgroundColorMain(d);
    const settingFontMain = makeBackendSettingFontMain(d);
    const settingFooterMain = makeBackendSettingFooterMain(d);
    const settingHeaderMain = makeBackendSettingHeaderMain(d);
    const settingColumnMain = makeBackendSettingColumnMain(d);
    const settingLinkMain = makeBackendSettingLinkMain(d);
    const settingSiteMain = makeBackendSettingSiteMain(d);
    
    
    // SELECT "isReady" FROM backendSettingBackgroundColor_ready
    // UNION ALL
    await settingBackgroundcolorMain.upsertOne({
      isReady: true,
    })
    
    // SELECT "isReady" FROM backendSettingColors_ready
    // UNION ALL
    await settingColorMain.upsertOne({
      isReady: true,
    })
    
    // SELECT "isReady" FROM backendSettingFont_ready
    // UNION ALL
    await settingFontMain.upsertOne({
      isReady: true,
    })

    // SELECT "isReady" FROM backendSettingFooter_ready
    // UNION ALL
    await settingFooterMain.upsertOne({
      isReady: true,
    })
    
    // SELECT "isReady" FROM backendSettingHeader_ready
    // UNION ALL
    await settingHeaderMain.upsertOne({
      isReady: true,
    })
    
    // SELECT "isReady" FROM backendSettingColumn_ready
    // UNION ALL
    await settingColumnMain.upsertOne({
      isReady: true,
    })
    
    // SELECT "isReady" FROM backendSettingLink_ready
    // UNION ALL
    await settingLinkMain.upsertOne({
      isReady: true,
    })
    
    // SELECT "isReady" FROM backendSettingSite_ready
    await settingSiteMain.upsertOne({
      isReady: true,
    })
    
    
    const settingAllMain = makeBackendSettingAllMain(d)
    const isWebsiteSettingReady = await settingAllMain.isWebsiteSettingReady()
    
    expect(isWebsiteSettingReady.result).toBe(true)
  })

  test("isSettingReady: is not Ready.", async () => {
    const settingAll = makeBackendSettingAllMain(d)

    const isSettingReady = await settingAll.isSettingReady()

    expect(isSettingReady.result).toBe(false)
  })

  test("isSettingReady: is Ready.", async () => {
    
    const settingOrganizationMain = makeBackendSettingOrganizationMain(d)
    await settingOrganizationMain.upsertOne({
      isReady: true
    })
    
    
    const settingAll = makeBackendSettingAllMain(d)
    const isSettingReady = await settingAll.isSettingReady()


    expect(isSettingReady.result).toBe(true)
  })


  afterAll(async () => {

    await d.dbTransaction.rollback()
  })
})

