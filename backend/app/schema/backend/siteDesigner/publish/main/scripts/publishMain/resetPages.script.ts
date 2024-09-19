import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageMain from "../../../../page/main/backendSiteDesignerPage.main";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import { PageStatusEnum } from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";

export default function resetPages(d: dependencies) {
  return async (): Promise<returningSuccessObj<null>> => {

    try {
      const pageMain = makeBackendSiteDesignerPageMain(d)

      // The new pages are now publish pages
      await pageMain.updateMany({
        status: PageStatusEnum.Published,
        where: {
          status: PageStatusEnum.New,
        },
      })

      // Reset dashboard values
      await pageMain.updateMany({
        paranoid: false,
        isChanged: false,
        isRecentlyCreated: false,
        isRecentlyDeleted: false,
      })

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
// @Column({
//     type: sequelize.BOOLEAN,
//     defaultValue: false,
//   })
//   isChanged: boolean;

//   @Column({
//     type: sequelize.BOOLEAN,
//     defaultValue: true,
//   })
//   isRecentlyCreated: boolean;

//   @Column({
//     type: sequelize.BOOLEAN,
//     defaultValue: false,
//   })
//   isRecentlyDeleted: boolean;