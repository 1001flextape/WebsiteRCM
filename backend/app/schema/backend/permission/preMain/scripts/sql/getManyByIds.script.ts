import { Model, Op } from "sequelize";
import backendPermission from "../../../../../../models/backend/permission/backendPermission.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getManyByIds(d: dependencies) {

  const db = d.db.models;

  return async (ids: string[]): Promise<returningSuccessObj<Model<backendPermission>[]>> => {

    const data = await db.backendPermission.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}
