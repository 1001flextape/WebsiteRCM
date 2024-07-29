import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import { Model } from "sequelize";
import makeBackendUserSql from "../../../preMain/backendUser.sql"
import backendUser from "../../../../../../models/backend/user/backendUser.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function deleteOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUser>>> => {

    const { errorHandler, loggers } = d
 
    const userSql = makeBackendUserSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "backendUser_getOneById_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendUser_getOneById_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userSql.deleteOne({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}