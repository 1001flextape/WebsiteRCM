import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendProjectHistoricalStatusListsSql from "../../../preMain/backendProjectHistoricalStatusLists.sql";

type input = {
  projectId: string;
}

export default function getPublishedPagesTotalCount(d: dependencies) {
    return async (args: input):  Promise<returningSuccessObj<{ name: string, id: string, isReady: boolean }[]>> => {
  
      const sql = makeBackendProjectHistoricalStatusListsSql(d);
  
      const response = sql.getConfiguration({
        projectId: args.projectId,
      }).catch(error => d.errorHandler(error, d.loggers))
  
      return response
    }
  }