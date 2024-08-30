import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { Op } from "sequelize";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";

type input = {
  projectId: string
}

export default function getDraftedPagesDeletedCount(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<number>> => {
    try {
      // Override paranoid setting for this query
      const data = await db.backendProjectPage.count({
        where: {
          projectId: args.projectId,
          status: PageStatusEnum.Draft,
          isDeleted: true,
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
