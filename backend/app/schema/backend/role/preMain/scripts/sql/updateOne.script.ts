import { Model } from "sequelize";
import backendRole from "../../../../../../models/backend/role/backendRole.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { Op } from "sequelize";

type input = { id: string, name: string }

export default function updateOne(d: dependencies) {

  const db = d.db.models;

  return async ({ id, name }: input): Promise<returningSuccessObj<Model<backendRole> | null>> => {

    const data = await db.backendRole.update(
      { name, },
      {
        where: { 
          id, 
          isDefault: {
            [Op.not]: true
          },
        },
        returning: true,
        transaction: d.dbTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


