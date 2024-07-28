import { Model } from "sequelize";
import backendRoleManyPermission from "../../../../../../models/backend/role/backendRoleManyPermission.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  roleId: string
  permissionId: string
}

export default function addManyPermissions(d: dependencies) {

  const db = d.db.models;

  return async (args: input[]): Promise<returningSuccessObj<Model<backendRoleManyPermission>>> => {

    const data = await db.backendRoleManyPermission.bulkCreate(args, {
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


