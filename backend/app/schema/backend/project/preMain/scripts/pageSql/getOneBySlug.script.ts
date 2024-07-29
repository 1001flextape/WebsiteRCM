import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPage from "../../../../../../models/backend/project/backendProjectPage.model";

type input = {
  projectId: string
  slug: string
}

export default function getOneBySlug(d: dependencies) {

  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendProjectPage> | null>> => {

    const data = await db.backendProjectPage.findOne({
      where,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


