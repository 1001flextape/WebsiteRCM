import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getPublishedPagesProgress(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<number>> => {
    try {
      // Count total published pages
      const totalPublished = await db.backendSiteDesignerPage.count({
        where: {
          isPublished: true,
        },
        transaction: d.dbTransaction,
      });

      // Count published pages that are ready
      const readyPublished = await db.backendSiteDesignerPage.count({
        where: {
          isPublished: true,
          isReady: true,
        },
        transaction: d.dbTransaction,
      });

      // Calculate the percentage
      const percentageReady = Math.ceil(totalPublished > 0 ? (readyPublished / totalPublished) * 100 : 0);

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
