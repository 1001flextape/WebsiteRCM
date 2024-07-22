import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionNormal from "../../../../../../../models/subDomain/backend/project/backendProjectPageSectionNormal.model";

type input = {
  id: string;
};

export default function getOneById(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageSectionNormal> | null>> => {
    const { id } = args;

    const data = await db.backendProjectPageSectionNormal.findByPk(id, {
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    return {
      success: true,
      data: data ? data : null,
    };
  };
}
