import backendProject from "../../../../../../../models/subDomain/backend/project/backendProject.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import makeBackendProjectSql from "../../../preMain/backendProject.sql";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendProject.sql";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination(d: dependencies) {

  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendProject> | null>> => {

    const publishSql = makeBackendProjectSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await publishSql.getManyWithPagination(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
