import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectFooter from "../../../../../../models/backend/project/backendProjectFooter.model";
import makeBackendProjectFooterSql from "../../../preMain/backendProjectFooter.sql";

type input = {  
  projectId: string
}

export default function getOneByProjectId(d: dependencies) {
  return async (where: input): Promise<returningSuccessObj<Model<backendProjectFooter> | null>> => {

    const sql = makeBackendProjectFooterSql(d);

    const response = sql.getOneByProjectId(where).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}