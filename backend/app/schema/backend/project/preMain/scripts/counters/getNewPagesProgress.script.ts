import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { Op } from "sequelize";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";

export default function getNewPagesProgress(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<number>> => {
    try {
      // Count total non-published pages
      const totalNonPublished = await db.backendSiteDesignerPage.count({
        where: {
          status: PageStatusEnum.New,
        },
        transaction: d.dbTransaction,
      });

      // Count non-published pages that are ready
      const readyNonPublished = await db.backendSiteDesignerPage.count({
        where: {
          isReady: true,
          status: PageStatusEnum.New,
        },
        transaction: d.dbTransaction,
      });

      // Calculate the percentage
      const percentageReady = Math.ceil(totalNonPublished > 0 ? (readyNonPublished / totalNonPublished) * 100 : 0);

      return {
        success: true,
        data: percentageReady,
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
