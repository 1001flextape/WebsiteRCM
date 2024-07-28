import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendProjectStatusListSql from "../../../preMain/backendProjectStatusLists.sql";

export default function getConfigurationReady(d: dependencies) {
  return async (): Promise<returningSuccessObj<{ name: string, count: number }[]>> => {

    const sql = makeBackendProjectStatusListSql(d);

    const response = sql.getConfigurationReady().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}