import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionLoud from "../../../../../../../models/subDomain/backend/project/backendProjectPageSectionLoud.model";
import makeBackendProjectPageSectionLoudSql from "../../../preMain/backendProjectPageSectionLoud.sql";

type input = {
  id: string;
};

export default function getOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageSectionLoud> | null>> => {

    const sql = makeBackendProjectPageSectionLoudSql(d);

    const response = sql.getOneById({
      id: args.id,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}