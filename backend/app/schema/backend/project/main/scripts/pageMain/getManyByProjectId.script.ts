import { Model } from "sequelize";
import makeBackendProjectPageSql from "../../../preMain/backendProjectPage.sql";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPage from "../../../../../../models/backend/project/backendProjectPage.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";


type input = { 
  projectId: string
}

export default function getManyByProjectId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPage>[] | null>> => {

    const sql = makeBackendProjectPageSql(d);

    const response = sql.getManyByProjectId(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}