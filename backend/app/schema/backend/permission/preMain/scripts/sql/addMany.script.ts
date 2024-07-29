import { Model } from "sequelize";
import backendPermission from "../../../../../../models/backend/permission/backendPermission.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  name: string
}

export default function addMany(d: dependencies) {

  const db = d.db.models;

  return async (args: input[]): Promise<returningSuccessObj<Model<backendPermission>[] | null>> => {

    const data = await db.backendPermission.bulkCreate(args, {
      transaction: d.dbTransaction,
      returning: true,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}
