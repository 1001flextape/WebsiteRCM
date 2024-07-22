import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionNormal from "../../../../../../../models/subDomain/backend/project/backendProjectPageSectionNormal.model";
import makeBackendProjectPageSectionNormalSql from "../../../preMain/backendProjectPageSectionNormal.sql";

type input = {
  id: string;
};

export default function getOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageSectionNormal> | null>> => {

    const sql = makeBackendProjectPageSectionNormalSql(d);

    const response = sql.getOneById({
      id: args.id,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}