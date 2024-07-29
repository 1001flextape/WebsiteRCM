import { Model } from "sequelize";
import backendRole from "../../../../../../models/backend/role/backendRole.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { id: string }

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendRole> | null>> => {

    const data = await db.backendRole.findOne({
      where,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


