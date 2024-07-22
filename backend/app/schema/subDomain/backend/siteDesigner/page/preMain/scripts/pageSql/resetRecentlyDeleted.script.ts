import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPage from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPage.model";
import { Op } from "sequelize";


export default function resetRecentlyDeleted(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPage> | null>> => {

    const data = await db.backendSiteDesignerPage.update(
      {
        isRecentlyDeleted: false,
      },
      {
        where: {
          deletedAt: {
            [Op.not]: null,
          },
        },
        transaction: d.subDomainTransaction,
        paranoid: false,
      })
      
    //   .catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
    }
  }
}


