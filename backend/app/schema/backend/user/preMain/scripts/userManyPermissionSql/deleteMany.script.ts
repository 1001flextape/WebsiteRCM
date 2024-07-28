import { Model } from "sequelize";
import backendUserManyPermission from "../../../../../../models/backend/user/backendUserManyPermission.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string
  permissionIdsArray: string[]
}

export default function deleteMany(d: dependencies) {
  const db = d.db.models;

  return async ({ userId, permissionIdsArray, }: input): Promise<returningSuccessObj<Model<backendUserManyPermission>[] | null>> => {

    const data = await db.backendUserManyPermission.bulkCreate(permissionIdsArray.map(permissionId => ({
      userId,
      permissionId,
    })), {
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


