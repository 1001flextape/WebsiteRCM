import { Model } from "sequelize";
import backendPermission from "../../../../../../models/backend/permission/backendPermission.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../utils/types/sequelize.types";
import makeBackendPermissionSql from "../../../preMain/backendPermission.sql";


export default function getManyByIds(d: dependencies) {
  return async (args?: string[]): Promise<returningSuccessObj<Model<backendPermission>[]>> => {

    const permissionSql = makeBackendPermissionSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await permissionSql.getManyByIds(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
