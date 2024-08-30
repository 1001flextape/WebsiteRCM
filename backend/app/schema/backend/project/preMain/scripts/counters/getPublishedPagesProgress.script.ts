import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";

export default function getPublishedPagesProgress(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<number>> => {
    try {
      // Count total published pages
      const totalPublished = await db.backendSiteDesignerPage.count({
        where: {
          status: PageStatusEnum.Published,
        },
        transaction: d.dbTransaction,
      });

      // Count published pages that are ready
      const readyPublished = await db.backendSiteDesignerPage.count({
        where: {
          status: PageStatusEnum.Published,
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
