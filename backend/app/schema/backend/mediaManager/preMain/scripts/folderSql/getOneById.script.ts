import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendMediaManagerFolder from "../../../../../../models/backend/mediaManager/backendMediaManagerFolder.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { id: string }

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendMediaManagerFolder> | null>> => {

    const data = await db.backendMediaManagerFolder.findOne({
      where: {
        ...where,
        deletedAt: null,
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


