import { Model } from "sequelize";
import backendUserManyRole from "../../../../../../models/backend/user/backendUserManyRole.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string
  roleIdsArray: string[]
}

export default function addMany(d: dependencies) {
  const db = d.db.models;

  return async ({ userId, roleIdsArray, }: input): Promise<returningSuccessObj<Model<backendUserManyRole>>> => {

    const data = await db.backendUserManyRole.bulkCreate(roleIdsArray.map(roleId => ({
      userId,
      roleId,
    })), {
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


