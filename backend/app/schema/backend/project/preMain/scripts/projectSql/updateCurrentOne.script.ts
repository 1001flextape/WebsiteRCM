import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProject from "../../../../../../models/backend/project/backendProject.model";

type input = {
  name?: string
  color?: string
  startedAt?: Date
  endedAt?: Date
}

export default function updateCurrentOne(d: dependencies) {

  const db = d.db.models;

  return async ({ ...args }: input): Promise<returningSuccessObj<Model<backendProject> | null>> => {

    const data = await db.backendProject.update(
      args,
      {
        where: { endedAt: null, },
        returning: true,
        transaction: d.dbTransaction,
      })
      // .catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


