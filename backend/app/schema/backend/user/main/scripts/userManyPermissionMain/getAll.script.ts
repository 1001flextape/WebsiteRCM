import { Model } from "sequelize";
import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import makeBackendUserManyPermissionSql from "../../../preMain/backendUserManyPermission.sql";
import backendUserManyPermission from "../../../../../../models/backend/user/backendUserManyPermission.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string
}

export default function getAll(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUserManyPermission>[]>> => {

    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "'userId' is missing.",
        errorIdentifier: "backendUserManyPermission_getAll_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "backendUserManyPermission_getAll_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userManyPermissionSql.getAll({
      userId: args.userId
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}