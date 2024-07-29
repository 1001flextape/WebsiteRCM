import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import { Model } from "sequelize";
import makeBackendUserSql from "../../../preMain/backendUser.sql"
import backendUser from "../../../../../../models/backend/user/backendUser.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  email: string
}

export default function getOneByEmail(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUser>>> => {

    const { errorHandler, loggers } = d
 
    const userSql = makeBackendUserSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.email) {
      return endMainFromError({
        hint: "'email' is missing.",
        errorIdentifier: "backendUser_getOneByEmail_error:0001"
      })
    }

    const isEmailValid = stringHelpers.isStringValidEmail({
      str: args.email,
    })

    if (!isEmailValid.result) {
      return endMainFromError({
        hint: "'email' is not a UUID.",
        errorIdentifier: "backendUser_getOneByEmail_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userSql.getOneByEmail({
      email: args.email,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}