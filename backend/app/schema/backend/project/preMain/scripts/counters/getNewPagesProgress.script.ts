import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { Op } from "sequelize";

export default function getNewPagesProgress(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<number>> => {
    try {
      // Count total non-published pages
      const totalNonPublished = await db.backendSiteDesignerPage.count({
        where: {
          isPublished: {
            [Op.not]: true,
          },
          isDraft: {
            [Op.not]: true,
          },
        },
        transaction: d.dbTransaction,
      });

      // Count non-published pages that are ready
      const readyNonPublished = await db.backendSiteDesignerPage.count({
        where: {
          isReady: true,
          isPublished: {
            [Op.not]: true,
          },
          isDraft: {
            [Op.not]: true,
          },
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
