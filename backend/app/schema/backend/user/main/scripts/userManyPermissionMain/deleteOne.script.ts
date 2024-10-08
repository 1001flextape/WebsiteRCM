import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendUserValidation from "../../../preMain/backendUser.validation";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import makeBackendUserManyPermissionSql from "../../../preMain/backendUserManyPermission.sql";
import makeBackendPermissionEntity from "../../../../permission";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string
  permissionId: string
}

export default function deleteOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<number>> => {

    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)
    const userValidation = makeBackendUserValidation(d)
    const { permissionEntity } = makeBackendPermissionEntity(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "'userId' is missing.",
        errorIdentifier: "backendUserManyPermission_deleteOne_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "backendUserManyPermission_deleteOne_error:0002"
      })
    }

    const isUserIdValid = await userValidation.isIdValid({
      id: args.userId
    }).catch(error => d.errorHandler(error, d.loggers))

    if (!isUserIdValid.result) {
      return endMainFromError({
        hint: "'userId' is not valid.",
        errorIdentifier: "backendUserManyPermission_deleteOne_error:0003"
      })
    }

    if (!args.permissionId) {
      return endMainFromError({
        hint: "'permissionId' is missing.",
        errorIdentifier: "backendUserManyPermission_deleteOne_error:0004"
      })
    }

    const isPermissionIdUuid = stringHelpers.isStringValidUuid({
      str: args.permissionId,
    })

    if (!isPermissionIdUuid.result) {
      return endMainFromError({
        hint: "'permissionId' is not a UUID.",
        errorIdentifier: "backendUserManyPermission_deleteOne_error:0005"
      })
    }

    // const isPermissionIdValid = await permissionEntity.isIdValid({
    //   id: args.userId
    // }).catch(error => d.errorHandler(error, d.loggers))

    // if (!isPermissionIdValid.result) {
    //   return endMainFromError({
    //     hint: "'permissionId' is not valid.",
    //     errorIdentifier: "backendUserManyPermission_deleteOne_error:0006"
    //   })
    // }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userManyPermissionSql.deleteOne({
      permissionId: args.permissionId,
      userId: args.userId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}