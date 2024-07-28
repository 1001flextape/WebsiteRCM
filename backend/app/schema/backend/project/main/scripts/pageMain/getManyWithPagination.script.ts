import backendProjectPage from "../../../../../../models/backend/project/backendProjectPage.model"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types"
import { findAndCountAll } from "../../../../../utils/types/sequelize.types"
import makeBackendProjectPageSql from "../../../preMain/backendProjectPage.sql"

type input = {
  projectId: string
  
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination(d: dependencies) {

  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendProjectPage> | null>> => {

    const pageSql = makeBackendProjectPageSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.getManyWithPagination(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
