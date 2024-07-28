import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import makeBackendUserManyRoleSql from "../../../preMain/backendUserManyRole.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string
  roleId: string
}

export default function deleteOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<number | null>> => {

    const userManyRoleSql = makeBackendUserManyRoleSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "'userId' is missing.",
        errorIdentifier: "backendUserManyRole_deleteOne_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "backendUserManyRole_deleteOne_error:0002"
      })
    }

    if (!args.roleId) {
      return endMainFromError({
        hint: "'roleId' is missing.",
        errorIdentifier: "backendUserManyRole_deleteOne_error:0003"
      })
    }

    const isRoleIdUuid = stringHelpers.isStringValidUuid({
      str: args.roleId,
    })

    if (!isRoleIdUuid.result) {
      return endMainFromError({
        hint: "'roleId' is not a UUID.",
        errorIdentifier: "backendUserManyRole_deleteOne_error:0004"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userManyRoleSql.deleteOne({
      roleId: args.roleId,
      userId: args.userId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}