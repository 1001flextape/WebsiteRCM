import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageLink from "../../../../../../models/backend/project/backendProjectPageLink.model";

type input = {
  projectId: string
}

export default function getManyByProjectId(d: dependencies) {
  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendProjectPageLink>[]>> => {

    const data = await db.backendProjectPageLink.findAll({
      where,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    return {
      success: true,
      data: data || [],
    };
  };
}