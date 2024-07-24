import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectFont from "../../../../../../../models/subDomain/backend/project/backendProjectFont.model";
import makeBackendProjectFontSql from "../../../preMain/backendProjectFont.sql";

type input = {  
  id: string
}

export default function getOneById(d: dependencies) {
  return async (where: input): Promise<returningSuccessObj<Model<backendProjectFont> | null>> => {

    const sql = makeBackendProjectFontSql(d);

    const response = sql.getOneById(where).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}