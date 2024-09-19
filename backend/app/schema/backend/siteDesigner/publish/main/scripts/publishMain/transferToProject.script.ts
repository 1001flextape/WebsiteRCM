import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
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
import makeBackendProjectBrowserMain from "../../../../../project/main/backendProjectBrowser.main";
import makeBackendProjectColorsMain from "../../../../../project/main/backendProjectColors.main";
import makeBackendProjectFooterMain from "../../../../../project/main/backendProjectFooter.main";
import makeBackendProjectHeaderMain from "../../../../../project/main/backendProjectHeader.main";
import makeBackendProjectLinkMain from "../../../../../project/main/backendProjectLink.main";
import makeBackendProjectOrganizationMain from "../../../../../project/main/backendProjectOrganization.main";
import makeBackendProjectPageMain from "../../../../../project/main/backendProjectPage.main";
import makeBackendProjectPageBrowserMain from "../../../../../project/main/backendProjectPageBrowser.main";
import makeBackendProjectPageLinkMain from "../../../../../project/main/backendProjectPageLink.main";
import makeBackendProjectPageSectionLoudMain from "../../../../../project/main/backendProjectPageSectionLoud.main";
import makeBackendProjectPageSectionNormalMain from "../../../../../project/main/backendProjectPageSectionNormal.main";
import makeBackendProjectMain from "../../../../../project/main/backendProject.main";
import makeBackendProjectBackgroundColorMain from "../../../../../project/main/backendProjectBackgroundColor.main";
import makeBackendSettingBackgroundColorMain from "../../../../../setting/backgroundColor/main/backendSettingBackgroundColor.main";
import makeBackendProjectColumnMain from "../../../../../project/main/backendProjectColumn.main";
import makeBackendSettingColumnMain from "../../../../../setting/column/main/backendSettingColumn.main";
import makeBackendProjectFontMain from "../../../../../project/main/backendProjectFont.main";
import makeBackendSettingFontMain from "../../../../../setting/font/main/backendSettingFont.main";

export default function transferToProject(d: dependencies) {
  return async (): Promise<returningSuccessObj<null>> => {

    try {
      //import
      const backendProject = makeBackendProjectMain(d)

      const backendProjectBrowser = makeBackendProjectBrowserMain(d)
      const backendSettingBrowser = makeBackendSettingSiteMain(d)

      const clientSiteBackgroundColor = makeBackendProjectBackgroundColorMain(d)
      const backendSettingBackgroundColor = makeBackendSettingBackgroundColorMain(d)

      const clientSiteColumn = makeBackendProjectColumnMain(d)
      const backendSettingColumn = makeBackendSettingColumnMain(d)

      const clientSiteFont = makeBackendProjectFontMain(d)
      const backendSettingFont = makeBackendSettingFontMain(d)

      const backendProjectColors = makeBackendProjectColorsMain(d)
      const backendSettingColors = makeBackendSettingColorsMain(d)

      const backendProjectFooter = makeBackendProjectFooterMain(d)
      const backendSettingFooter = makeBackendSettingFooterMain(d)

      const backendProjectHeader = makeBackendProjectHeaderMain(d)
      const backendSettingHeader = makeBackendSettingHeaderMain(d)

      const backendProjectLink = makeBackendProjectLinkMain(d)
      const backendSettingLink = makeBackendSettingLinkMain(d)

      const backendProjectOrganization = makeBackendProjectOrganizationMain(d)
      const backendSettingOrganization = makeBackendSettingOrganizationMain(d)

      const backendProjectPage = makeBackendProjectPageMain(d)
      const backendSiteDesignerPage = makeBackendSiteDesignerPageMain(d)

      const backendProjectPageBrowser = makeBackendProjectPageBrowserMain(d)
      const backendSiteDesignerPageBrowser = makeBackendSiteDesignerPageBrowserMain(d)

      const backendProjectPageLink = makeBackendProjectPageLinkMain(d)
      const backendSiteDesignerPageLink = makeBackendSiteDesignerPageLinkMain(d)

      const backendProjectPageSectionLoud = makeBackendProjectPageSectionLoudMain(d)
      const backendSiteDesignerPageSectionLoud = makeBackendSiteDesignerPageSectionLoudMain(d)

      const backendProjectPageSectionNormal = makeBackendProjectPageSectionNormalMain(d)
      const backendSiteDesignerPageSectionNormal = makeBackendSiteDesignerPageSectionNormalMain(d)

      const currentProject = await backendProject.getCurrentOne()

      // website
      const browser = await backendSettingBrowser.getOne()
      if (browser.data) {
        await backendProjectBrowser.addOne({
          ...browser.data.dataValues,
          projectId: currentProject.data.dataValues.id,
        })
      }

      const colors = await backendSettingColors.getOne()
      if (colors.data) {
        await backendProjectColors.addOne({
          ...colors.data.dataValues,
          projectId: currentProject.data.dataValues.id,
        })
      }

      const footer = await backendSettingFooter.getOne()
      if (footer.data) {
        await backendProjectFooter.addOne({
          // ...footer.data.dataValues,
          projectId: currentProject.data.dataValues.id,
          webAssetImport: footer.data.dataValues.webAssetImport,
          menuJsonB: footer.data.dataValues.menuJsonB.toString(),
          selectionId: footer.data.dataValues.selectionId,
          selectionType: footer.data.dataValues.selectionType,
          userAnswersJsonB: footer.data.dataValues.userAnswersJsonB,
        })
      }

      const header = await backendSettingHeader.getOne()
      if (header.data) {
        await backendProjectHeader.addOne({
          projectId: currentProject.data.dataValues.id,
          webAssetImport: header.data.dataValues.webAssetImport,
          menuJsonB: header.data.dataValues.menuJsonB.toString(),
          selectionId: header.data.dataValues.selectionId,
          selectionType: header.data.dataValues.selectionType,
          userAnswersJsonB: header.data.dataValues.userAnswersJsonB,
        })
      }

      const link = await backendSettingLink.getOne()
      if (link.data) {
        await backendProjectLink.addOne({
          projectId: currentProject.data.dataValues.id,
          description: link.data.dataValues.description,
          image: link.data.dataValues.image,
          title: link.data.dataValues.title,
        })
      }

      const organization = await backendSettingOrganization.getOne()
      if (organization.data) {
        await backendProjectOrganization.addOne({
          ...organization.data.dataValues,
          projectId: currentProject.data.dataValues.id,
        })
      }

      const backgroundColor = await backendSettingBackgroundColor.getOne()
      if (backgroundColor.data) {
        await clientSiteBackgroundColor.addOne({
          ...backgroundColor.data.dataValues,
          projectId: currentProject.data.dataValues.id,
        })
      }

      const column = await backendSettingColumn.getOne()
      if (column.data) {
        await clientSiteColumn.addOne({
          ...column.data.dataValues,
          projectId: currentProject.data.dataValues.id,
        })
      }

      const font = await backendSettingFont.getOne()
      if (font.data) {
        await clientSiteFont.addOne({
          ...font.data.dataValues,
          projectId: currentProject.data.dataValues.id,
        })
      }
      

      // pages
      const page = await backendSiteDesignerPage.getMany()
      if (page.data) {
        await backendProjectPage.addMany(page.data.map(p => ({
          ...p.dataValues,
          projectId: currentProject.data.dataValues.id,
        })))
      }

      const pageBrowser = await backendSiteDesignerPageBrowser.getMany()
      if (pageBrowser.data) {
        await backendProjectPageBrowser.addMany(pageBrowser.data.map(p => ({
          ...p.dataValues,
          projectId: currentProject.data.dataValues.id,
        })))
      }

      const pageLink = await backendSiteDesignerPageLink.getMany()
      if (pageLink) {
        await backendProjectPageLink.addMany(pageLink.data.map(p => ({
          ...p.dataValues,
          projectId: currentProject.data.dataValues.id,
        })))
      }

      const pageSectionLoud = await backendSiteDesignerPageSectionLoud.getMany()
      if (pageSectionLoud.data) {
        // !! warning, using bad old set list system
        await backendProjectPageSectionLoud.addMany(pageSectionLoud.data.map(p => ({
          ...p.dataValues,
          menuJsonB: JSON.stringify(p.dataValues.menuJsonB),
          projectId: currentProject.data.dataValues.id,
        })))
      }

      const pageSectionNormal = await backendSiteDesignerPageSectionNormal.getMany()
      if (pageSectionNormal.data) {
        // !! warning, using bad old set list system
        await backendProjectPageSectionNormal.addMany(pageSectionNormal.data.map(p => ({
          ...p.dataValues,
          menuJsonB: JSON.stringify(p.dataValues.menuJsonB),
          projectId: currentProject.data.dataValues.id,
        })))
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