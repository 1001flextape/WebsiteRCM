import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { Op } from "sequelize";

type input = {
  projectId: string
}

export default function getDraftedPagesDeletedCount(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<number>> => {
    try {
      // Override paranoid setting for this query
      const data = await db.backendProjectPage.count({
        where: {
          projectId: args.projectId,
          isPublished: {
            [Op.not]: true,
          },
          isDraft: true,
          isDeleted: true,
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
