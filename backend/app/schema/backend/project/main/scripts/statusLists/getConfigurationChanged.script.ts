import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendProjectStatusListSql from "../../../preMain/backendProjectStatusLists.sql";

export default function getConfigurationChanged(d: dependencies) {
  return async (): Promise<returningSuccessObj<{ name: string, id: string, isReady: boolean }[]>> => {

    const sql = makeBackendProjectStatusListSql(d);

    const response = sql.getConfigurationChanged().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}