import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendProjectCountersSql from "../../../preMain/backendProjectCounter.sql";

export default function getPublishedPagesChangedCount(d: dependencies) {
  return async (): Promise<returningSuccessObj<number>> => {

    const sql = makeBackendProjectCountersSql(d);

    const response = sql.getPublishedPagesChangedCount().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}