import { Model } from "sequelize";
import backendRole from "../../../../../../models/backend/role/backendRole.model";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendRoleSql from "../../../preMain/backendRole.sql";
import makeBackendRoleValidation from "../../../preMain/backendRole.validation";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";


export default function getManyTwoList(d: dependencies) {
  return async (): Promise<returningSuccessObj<{ builtInRoles: backendRole[]; customRoles: backendRole[] }>> => {

    const backendRoleSql = makeBackendRoleSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await backendRoleSql.getManyTwoList().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}