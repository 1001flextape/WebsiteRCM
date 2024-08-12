import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendRoleSql from "../../../preMain/backendRole.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import backendPermission from "../../../../../../models/backend/permission/backendPermission.model";

type input = {
  roleId: string
}

export default function getPermissionsByRoleId(d: dependencies) {
  return async (where: input): Promise<returningSuccessObj<Model<backendPermission>[]>> => {

    const backendRoleSql = makeBackendRoleSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await backendRoleSql.getPermissionsByRoleId(where).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}