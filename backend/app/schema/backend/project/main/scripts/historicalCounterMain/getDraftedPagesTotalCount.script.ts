import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendProjectCountersSql from "../../../preMain/backendProjectCounter.sql";
import makeBackendProjectHistoricalCounterSql from "../../../preMain/backendProjectHistoricalCounter.sql";

type input = {
  projectId: string;
}

export default function getDraftedPagesTotalCount(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<number>> => {

    const sql = makeBackendProjectHistoricalCounterSql(d);

    const response = sql.getDraftedPagesTotalCount({
      projectId: args.projectId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}