import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectColumn from "../../../../../../../models/subDomain/backend/project/backendProjectColumn.model";
import makeBackendProjectColumnSql from "../../../preMain/backendProjectColumn.sql";

type input = {  
  projectId: string
}

export default function getOneByProjectId(d: dependencies) {
  return async (where: input): Promise<returningSuccessObj<Model<backendProjectColumn> | null>> => {

    const sql = makeBackendProjectColumnSql(d);

    const response = sql.getOneByProjectId(where).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}