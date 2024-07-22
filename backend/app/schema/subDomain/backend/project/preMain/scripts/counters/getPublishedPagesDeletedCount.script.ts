import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getPublishedPagesDeletedCount(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<number>> => {
    try {
      const data = await db.backendSiteDesignerPage.count({
        where: {
          isPublished: true,
          isRecentlyDeleted: true,
        },
        paranoid: false, // Disable paranoid for this specific query
        transaction: d.subDomainTransaction,
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
