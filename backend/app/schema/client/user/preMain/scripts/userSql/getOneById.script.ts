import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientUser from "../../../../../../models/client/user/clientUser.model";

type input = { id: string }

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<clientUser> | null>> => {

    const data = await db.clientUser.findOne({
      where,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


