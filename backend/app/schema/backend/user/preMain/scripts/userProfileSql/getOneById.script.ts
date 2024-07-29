import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendUserProfile from "../../../../../../models/backend/user/backendUserProfile.model";

type input = { id: string }

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async ({ id }: input): Promise<returningSuccessObj<Model<backendUserProfile> | null>> => {

    const data = await db.backendUserProfile.findOne({
      where: {
        id
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}

