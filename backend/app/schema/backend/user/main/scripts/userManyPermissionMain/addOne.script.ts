import { Model } from "sequelize";
import backendUserManyPermission from "../../../../../../models/backend/user/backendUserManyPermission.model";
import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendUserValidation from "../../../preMain/backendUser.validation";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import makeBackendUserManyPermissionSql from "../../../preMain/backendUserManyPermission.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string
  permissionId: string
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUserManyPermission> | null>> => {

    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "'userId' is missing.",
        errorIdentifier: "backendUserManyPermission_addOne_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "backendUserManyPermission_addOne_error:0002"
      })
    }

    if (!args.permissionId) {
      return endMainFromError({
        hint: "'permissionId' is missing.",
        errorIdentifier: "backendUserManyPermission_addOne_error:0003"
      })
    }

    const isPermissionIdUuid = stringHelpers.isStringValidUuid({
      str: args.permissionId,
    })

    if (!isPermissionIdUuid.result) {
      return endMainFromError({
        hint: "'permissionId' is not a UUID.",
        errorIdentifier: "backendUserManyPermission_addOne_error:0004"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userManyPermissionSql.addOne({
      permissionId: args.permissionId,
      userId: args.userId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}