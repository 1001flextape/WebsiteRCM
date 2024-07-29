import { Op } from "sequelize";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { nameArray: string[] }

export default function areNamesTaken(d: dependencies) {

  const db = d.db.models;

  return async ({ nameArray }: input): Promise<returningSuccessObj<null>> => {

    const data: number = await db.backendRole.count({
      where: {
        name: {
          [Op.in]: nameArray
        }
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data === nameArray.length
    }
  }
}