import { Model } from "sequelize";
import makeBackendProjectColorsSql from "../../../preMain/backendProjectColors.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectColors from "../../../../../../models/backend/project/backendProjectColors.model";

type input = {  
  id: string
}

export default function getOneById(d: dependencies) {
  return async (where: input): Promise<returningSuccessObj<Model<backendProjectColors> | null>> => {

    const sql = makeBackendProjectColorsSql(d);

    const response = sql.getOneById(where).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}