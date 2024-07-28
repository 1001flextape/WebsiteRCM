import backendRole from "../../../../../../models/backend/role/backendRole.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../utils/types/sequelize.types";
import makeBackendRoleSql from "../../../../role/preMain/backendRole.sql";
import makeBackendUserSql from "../../../preMain/backendUser.sql";
import makeBackendUserManyRoleSql from "../../../preMain/backendUserManyRole.sql";
import makeBackendUserProfileSql from "../../../preMain/backendUserProfile.sql";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination(d: dependencies) {
  
  const db = d.db.models;

  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendRole> | null>> => {

    const { errorHandler, loggers } = d

    const userSql = makeBackendUserSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await userSql.getManyWithPagination(args).catch(error => errorHandler(error, loggers))

    return response;
  }
}
