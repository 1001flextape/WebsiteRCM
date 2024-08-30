import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { Op } from "sequelize";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";

export default function getNewPagesDeletedCount(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<number>> => {
    try {
      const data = await db.backendSiteDesignerPage.count({
        where: {
          status: PageStatusEnum.New,
          isRecentlyDeleted: true,
        },
        paranoid: false, // Disable paranoid for this specific query
        transaction: d.dbTransaction,
      });

      return {
        success: true,
        data: data ? data : null,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        data: null,
      };
    }
  }
}
