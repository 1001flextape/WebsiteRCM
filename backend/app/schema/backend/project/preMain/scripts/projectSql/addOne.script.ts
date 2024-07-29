import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProject from "../../../../../../models/backend/project/backendProject.model";

type input = { 
  name: string
  color: string
  startedAt?: Date
  endedAt?: Date
}

export default function addOne(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProject> | null>> => {

    const data = await db.backendProject.create(
      args,
      {
        transaction: d.dbTransaction,
        returning: true,
      }
    )
    // .catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


