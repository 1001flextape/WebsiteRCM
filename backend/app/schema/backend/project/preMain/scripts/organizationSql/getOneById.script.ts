import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectOrganization from "../../../../../../models/backend/project/backendProjectOrganization.model";

type input = {  
  id: string
}

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendProjectOrganization> | null>> => {

    const data = await db.backendProjectOrganization.findOne({
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