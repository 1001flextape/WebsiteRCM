import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionNormal from "../../../../../../models/backend/project/backendProjectPageSectionNormal.model";

type input = {
  pageId: string;
};

export default function getManyByPageId(d: dependencies) {
  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendProjectPageSectionNormal>[]>> => {

    const data = await db.backendProjectPageSectionNormal.findAll({
      where,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    return {
      success: true,
      data: data || [],
    };
  };
}
