import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectBackgroundColor from "../../../../../../models/backend/project/backendProjectBackgroundColor.model";

type input = {  
  projectId: string
}

export default function getOneByProjectId(d: dependencies) {

  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendProjectBackgroundColor> | null>> => {

    const data = await db.backendProjectBackgroundColor.findOne({
      where,
      transaction: d.dbTransaction,
      order: [['createdAt', 'DESC']]
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}