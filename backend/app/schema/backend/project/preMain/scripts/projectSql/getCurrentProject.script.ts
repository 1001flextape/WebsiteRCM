import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProject from "../../../../../../models/backend/project/backendProject.model";

export default function getCurrentProject(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<backendProject> | null>> => {

    const data = await db.backendProject.findOne({
      where: {
        endedAt: null,
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


