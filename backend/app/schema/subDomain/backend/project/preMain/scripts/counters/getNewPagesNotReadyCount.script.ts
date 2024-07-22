import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { Op } from "sequelize";

export default function getNewPagesNotReadyCount(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<number>> => {

    const data = await db.backendSiteDesignerPage.count({
      where:{
        isPublished: {
          [Op.not]: true,
        },
        isDraft: {
          [Op.not]: true,
        },
        isReady: {
          [Op.not]: true,
        },
      },
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}