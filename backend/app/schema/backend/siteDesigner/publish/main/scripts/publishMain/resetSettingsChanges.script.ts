import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendSettingSiteMain from "../../../../../setting/site/main/backendSettingSite.main";
import makeBackendSettingColorsMain from "../../../../../setting/colors/main/backendSettingColors.main";
import makeBackendSettingFooterMain from "../../../../../setting/footer/main/backendSettingFooter.main";
import makeBackendSettingHeaderMain from "../../../../../setting/header/main/backendSettingHeader.main";
import makeBackendSettingLinkMain from "../../../../../setting/links/main/backendSettingLink.main";
import makeBackendSettingOrganizationMain from "../../../../../setting/organization/main/backendSettingOrganization.main";
import makeBackendSettingColumnMain from "../../../../../setting/column/main/backendSettingColumn.main";
import makeBackendSettingBackgroundColorMain from "../../../../../setting/backgroundColor/main/backendSettingBackgroundColor.main";
import makeBackendSettingFontMain from "../../../../../setting/font/main/backendSettingFont.main";

export default function resetSettingsChanges(d: dependencies) {
  return async (): Promise<returningSuccessObj<null>> => {

    try {
      //import
      const backendSettingColors = makeBackendSettingColorsMain(d)
      const backendSettingBackgroundColor = makeBackendSettingBackgroundColorMain(d)
      const backendSettingFont = makeBackendSettingFontMain(d)

      const backendSettingFooter = makeBackendSettingFooterMain(d)
      const backendSettingHeader = makeBackendSettingHeaderMain(d)
      const backendSettingColumn = makeBackendSettingColumnMain(d)
      const backendSettingLink = makeBackendSettingLinkMain(d)
      const backendSettingBrowser = makeBackendSettingSiteMain(d)

      const backendSettingOrganization = makeBackendSettingOrganizationMain(d)

      await backendSettingColors.resetIsChanged()

      await backendSettingBackgroundColor.resetIsChanged()


      await backendSettingFont.resetIsChanged()

      await backendSettingFooter.resetIsChanged()

      await backendSettingHeader.resetIsChanged()

      await backendSettingColumn.resetIsChanged()

      await backendSettingLink.resetIsChanged()

      await backendSettingBrowser.resetIsChanged()

      await backendSettingOrganization.resetIsChanged()

      return {
        success: true,
      }

    } catch (ex) {
      return endMainFromError({
        errorIdentifier: "backendSiteDesignerPublish_resetSettingsChanges_error:0000",
        hint: "Error during website publish."
      })
    }
  }
}