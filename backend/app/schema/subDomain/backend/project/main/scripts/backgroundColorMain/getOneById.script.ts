import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectBackgroundColor from "../../../../../../../models/subDomain/backend/project/backendProjectBackgroundColor.model";
import makeBackendProjectBackgroundColorSql from "../../../preMain/backendProjectBackgroundColor.sql";

type input = {  
  id: string
}

export default function getOneById(d: dependencies) {
  return async (where: input): Promise<returningSuccessObj<Model<backendProjectBackgroundColor> | null>> => {

    const sql = makeBackendProjectBackgroundColorSql(d);

    const response = sql.getOneById(where).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}