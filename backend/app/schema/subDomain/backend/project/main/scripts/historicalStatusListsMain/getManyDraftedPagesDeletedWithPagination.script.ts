import backendProjectPage from "../../../../../../../models/subDomain/backend/project/backendProjectPage.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import makeBackendProjectHistoricalStatusListsSql from "../../../preMain/backendProjectHistoricalStatusLists.sql";

type input = {
  projectId: string;
}

export default function getManyDraftedPagesDeletedWithPagination(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<findAndCountAll<backendProjectPage>>> => {
  
      const sql = makeBackendProjectHistoricalStatusListsSql(d);
  
      const response = sql.getManyDraftedPagesDeletedWithPagination({
        projectId: args.projectId,
      }).catch(error => d.errorHandler(error, d.loggers))
  
      return response
    }
  }