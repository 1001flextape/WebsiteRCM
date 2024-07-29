import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectHeader from "../../../../../../models/backend/project/backendProjectHeader.model";

type input = {  
  id: string
}
export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendProjectHeader> | null>> => {

    const data = await db.backendProjectHeader.findOne({
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