import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectHeader from "../../../../../../models/backend/project/backendProjectHeader.model";
import makeBackendProjectHeaderSql from "../../../preMain/backendProjectHeader.sql";


type input = {  
  id: string
}

export default function getOneById(d: dependencies) {
  return async (where: input): Promise<returningSuccessObj<Model<backendProjectHeader> | null>> => {

    const sql = makeBackendProjectHeaderSql(d);

    const response = sql.getOneById(where).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}