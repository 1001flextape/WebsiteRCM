import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeClientSiteColorsMain from "../../../../../../client/site/main/clientSiteColors.main";
import makeClientSiteBrowserMain from "../../../../../../client/site/main/clientSiteBrowser.main";
import makeClientSiteFooterMain from "../../../../../../client/site/main/clientSiteFooter.main";
import makeClientSiteHeaderMain from "../../../../../../client/site/main/clientSiteHeader.main";
import makeClientSiteLinkMain from "../../../../../../client/site/main/clientSiteLink.main";
import makeClientSiteOrganizationMain from "../../../../../../client/site/main/clientSiteOrganization.main";
import makeClientSitePageMain from "../../../../../../client/site/main/clientSitePage.main";
import makeClientSitePageBrowserMain from "../../../../../../client/site/main/clientSitePageBrowser.main";
import makeClientSitePageLinkMain from "../../../../../../client/site/main/clientSitePageLink.main";
import makeClientSitePageSectionLoudMain from "../../../../../../client/site/main/clientSitePageSectionLoud.main";
import makeClientSitePageSectionNormalMain from "../../../../../../client/site/main/clientSitePageSectionNormal.main";
import makeBackendSettingSiteMain from "../../../../../setting/site/main/backendSettingSite.main";
import makeBackendSettingColorsMain from "../../../../../setting/colors/main/backendSettingColors.main";
import makeBackendSettingFooterMain from "../../../../../setting/footer/main/backendSettingFooter.main";
import makeBackendSettingHeaderMain from "../../../../../setting/header/main/backendSettingHeader.main";
import makeBackendSettingLinkMain from "../../../../../setting/links/main/backendSettingLink.main";
import makeBackendSettingOrganizationMain from "../../../../../setting/organization/main/backendSettingOrganization.main";
import makeBackendSiteDesignerPageMain from "../../../../page/main/backendSiteDesignerPage.main";
import makeBackendSiteDesignerPageBrowserMain from "../../../../page/main/backendSiteDesignerPageBrowser.main";
import makeBackendSiteDesignerPageLinkMain from "../../../../page/main/backendSiteDesignerPageLink.main";
import makeBackendSiteDesignerPageSectionLoudMain from "../../../../page/main/backendSiteDesignerPageSectionLoud.main";
import makeBackendSiteDesignerPageSectionNormalMain from "../../../../page/main/backendSiteDesignerPageSectionNormal.main";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import { Model } from "sequelize";
import makeClientSiteBackgroundColorMain from "../../../../../../client/site/main/clientSiteBackgroundColor.main";
import makeBackendSettingBackgroundColorMain from "../../../../../setting/backgroundColor/main/backendSettingBackgroundColor.main";
import makeClientSiteColumnMain from "../../../../../../client/site/main/clientSiteColumn.main";
import makeBackendSettingColumnMain from "../../../../../setting/column/main/backendSettingColumn.main";
import makeBackendSettingFontMain from "../../../../../setting/font/main/backendSettingFont.main";
import makeClientSiteFontMain from "../../../../../../client/site/main/clientSiteFont.main";

export default function transferToClient(d: dependencies) {
  return async (): Promise<returningSuccessObj<null>> => {

    try {
      //import
      const clientSiteColors = makeClientSiteColorsMain(d)
      const backendSettingColors = makeBackendSettingColorsMain(d)

      const clientSiteBackgroundColor = makeClientSiteBackgroundColorMain(d)
      const backendSettingBackgroundColor = makeBackendSettingBackgroundColorMain(d)

      const clientSiteColumn = makeClientSiteColumnMain(d)
      const backendSettingColumn = makeBackendSettingColumnMain(d)

      const clientSiteFont = makeClientSiteFontMain(d)
      const backendSettingFont = makeBackendSettingFontMain(d)

      const clientSiteBrowser = makeClientSiteBrowserMain(d)
      const backendSettingBrowser = makeBackendSettingSiteMain(d)


      const clientSiteFooter = makeClientSiteFooterMain(d)
      const backendSettingFooter = makeBackendSettingFooterMain(d)

      const clientSiteHeader = makeClientSiteHeaderMain(d)
      const backendSettingHeader = makeBackendSettingHeaderMain(d)

      const clientSiteLink = makeClientSiteLinkMain(d)
      const backendSettingLink = makeBackendSettingLinkMain(d)

      const clientSiteOrganization = makeClientSiteOrganizationMain(d)
      const backendSettingOrganization = makeBackendSettingOrganizationMain(d)






      const clientSitePage = makeClientSitePageMain(d)
      const backendSettingPage = makeBackendSiteDesignerPageMain(d)

      const clientSitePageBrowser = makeClientSitePageBrowserMain(d)
      const backendSiteDesignerPageBrowser = makeBackendSiteDesignerPageBrowserMain(d)

      const clientSitePageLink = makeClientSitePageLinkMain(d)
      const backendSiteDesignerPageLink = makeBackendSiteDesignerPageLinkMain(d)

      const clientSitePageSectionLoud = makeClientSitePageSectionLoudMain(d)
      const backendSiteDesignerPageSectionLoud = makeBackendSiteDesignerPageSectionLoudMain(d)

      const clientSitePageSectionNormal = makeClientSitePageSectionNormalMain(d)
      const backendSiteDesignerPageSectionNormal = makeBackendSiteDesignerPageSectionNormalMain(d)

      // website
      const browser = await backendSettingBrowser.getOne()
      if (browser.data) {
        await clientSiteBrowser.upsertOne(browser.data.dataValues)
      }

      const colors = await backendSettingColors.getOne()
      if (colors.data) {
        await clientSiteColors.upsertOne(colors.data.dataValues)
      }

      const footer = await backendSettingFooter.getOne()
      if (footer.data) {
        await clientSiteFooter.upsertOne(footer.data.dataValues)
      }

      const header = await backendSettingHeader.getOne()
      if (header.data) {
        await clientSiteHeader.upsertOne(header.data.dataValues)
      }

      const link = await backendSettingLink.getOne()
      if (link.data) {
        await clientSiteLink.upsertOne(link.data.dataValues)
      }

      const organization = await backendSettingOrganization.getOne()
      if (organization.data) {
        await clientSiteOrganization.upsertOne(organization.data.dataValues)
      }

      const backgroundColor = await backendSettingBackgroundColor.getOne()
      if (backgroundColor.data) {
        await clientSiteBackgroundColor.upsertOne(backgroundColor.data.dataValues)
      }

      const column = await backendSettingColumn.getOne()
      if (column.data) {
        await clientSiteColumn.upsertOne(column.data.dataValues)
      }

      const font = await backendSettingFont.getOne()
      if (font.data) {
        await clientSiteFont.upsertOne(font.data.dataValues)
      }


      // pages
      const page = await backendSettingPage.getManyPublishable()
      if (page.data) {
        await clientSitePage.setList(page.data.map(p => p.dataValues))
      }

      const pageBrowser = await backendSiteDesignerPageBrowser.getManyPublishable()
      if (pageBrowser.data) {
        await clientSitePageBrowser.setList(pageBrowser.data.map(p => p.dataValues))
      }

      const pageLink = await backendSiteDesignerPageLink.getManyPublishable()
      if (pageLink) {
        await clientSitePageLink.setList(pageLink.data.map(p => p.dataValues))
      }

      const pageSectionLoud = await backendSiteDesignerPageSectionLoud.getManyPublishable()
      if (pageSectionLoud.data) {
        // !! warning, using bad old set list system
        await clientSitePageSectionLoud.setList(pageSectionLoud.data.map(p => {
          const data = { ...p.dataValues };
          delete data.id

          return data
        }))
      }

      const pageSectionNormal = await backendSiteDesignerPageSectionNormal.getManyPublishable()
      if (pageSectionNormal.data) {
        // !! warning, using bad old set list system
        await clientSitePageSectionNormal.setList(pageSectionNormal.data.map(p => {
          const data = p.dataValues;
          delete data.id;

          return data;
        }))
      }

      //update project:
      // const publishRecord = makeBackendSiteDesignerPublishRecordMain(d)
      // const response = await publishRecord.addOne({
      //   numberOfPages: page.data.length
      // })

      return {
        success: true,
      }

    } catch (ex) {
      return endMainFromError({
        errorIdentifier: "backendSiteDesignerPublish_publishSite_error:0000",
        hint: "Error during website publish."
      })
    }


  }
}