import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { Op } from "sequelize";

type input = {
  projectId: string
}

export default function getPublishedPagesChangedCount(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<number>> => {

    const data = await db.backendProjectPage.count({
      where:{
        projectId: args.projectId,
        isPublished: true,
        isDraft: {
          [Op.not]: true,
        },
        isChanged: true,
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}