import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPage from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPage.model";


export default function resetRecentlyCreated(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPage> | null>> => {

    const data = await db.backendSiteDesignerPage.update(
      {
        isRecentlyCreated: false,
      },
      {
        where: {
          isRecentlyCreated: true,
        },
        transaction: d.subDomainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
    }
  }
}


