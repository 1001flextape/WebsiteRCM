import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { Op } from "sequelize";

type input = {
  projectId: string
}

export default function getDraftedPagesTotalCount(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<number>> => {

    const data = await db.backendProjectPage.count({
      where:{
        projectId: args.projectId,
        isPublished: {
          [Op.not]: true,
        },
        isDraft: true,
        isDeleted: {
          [Op.not]: true,
        },
      },
      transaction: d.subDomainTransaction,
    })
    // .catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}