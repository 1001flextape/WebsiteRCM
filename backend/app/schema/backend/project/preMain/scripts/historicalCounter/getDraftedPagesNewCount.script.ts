import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { Op } from "sequelize";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";

type input = {
  projectId: string
}

export default function getDraftedPagesNewCount(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<number>> => {

    const data = await db.backendProjectPage.count({
      where:{
        projectId: args.projectId,
        status: PageStatusEnum.Draft,
        isNew: true,
      },
      transaction: d.dbTransaction,
    })
    // .catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}