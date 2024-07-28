import { Model } from "sequelize";
import backendUserManyPermission from "../../../../../../models/backend/user/backendUserManyPermission.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string
}

export default function getAll(d: dependencies) {
  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendUserManyPermission>[]>> => {

    const data = await db.backendUserManyPermission.findAll({
      where,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data,
    }
  }
}