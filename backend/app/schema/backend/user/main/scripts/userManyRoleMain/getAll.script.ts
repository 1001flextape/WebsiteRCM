import { Model } from "sequelize";
import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import makeBackendUserManyRoleSql from "../../../preMain/backendUserManyRole.sql";
import backendUserManyRole from "../../../../../../models/backend/user/backendUserManyRole.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string
}

export default function getAll(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUserManyRole>[]>> => {

    const { errorHandler, loggers } = d

    const userManyRoleSql = makeBackendUserManyRoleSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "'userId' is missing.",
        errorIdentifier: "backendUserManyRole_getAll_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "backendUserManyRole_getAll_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userManyRoleSql.getAll({
      userId: args.userId
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}