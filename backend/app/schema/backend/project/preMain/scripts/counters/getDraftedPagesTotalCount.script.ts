import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { Op } from "sequelize";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";

export default function getDraftedPagesTotalCount(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<number>> => {

    const data = await db.backendSiteDesignerPage.count({
      where:{
        status: PageStatusEnum.Draft,
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}