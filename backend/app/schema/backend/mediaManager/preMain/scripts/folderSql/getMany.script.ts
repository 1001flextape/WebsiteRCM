import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types"
import backendMediaManagerFolder from "../../../../../../models/backend/mediaManager/backendMediaManagerFolder.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  folderId?: string
}

export default function getMany(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendMediaManagerFolder>[]>> => {

    let data: Model<backendMediaManagerFolder>[] = await db.backendMediaManagerFolder.findAll({
      where: {
        folderId: args.folderId || null,
        deletedAt: null,
      },
      transaction: d.dbTransaction
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


