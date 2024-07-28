import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectBrowser from "../../../../../../models/backend/project/backendProjectBrowser.model";
import makeBackendProjectBrowserSql from "../../../preMain/backendProjectBrowser.sql";

type input = {  
  projectId: string
}

export default function getOneByProjectId(d: dependencies) {
  return async (where: input): Promise<returningSuccessObj<Model<backendProjectBrowser> | null>> => {

    const sql = makeBackendProjectBrowserSql(d);

    const response = sql.getOneByProjectId(where).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}