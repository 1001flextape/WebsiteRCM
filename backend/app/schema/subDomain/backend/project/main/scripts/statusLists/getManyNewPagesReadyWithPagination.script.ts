import backendSiteDesignerPage from "../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPage.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import makeBackendProjectStatusListSql from "../../../preMain/backendProjectStatusLists.sql";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyNewPagesReadyWithPagination(d: dependencies) {
  return async (args: input = {}): Promise<returningSuccessObj<findAndCountAll<backendSiteDesignerPage>>> => {

    const sql = makeBackendProjectStatusListSql(d);

    const response = sql.getManyNewPagesReadyWithPagination(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}