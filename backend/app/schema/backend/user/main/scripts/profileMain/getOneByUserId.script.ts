import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import backendUserProfile from "../../../../../../models/backend/user/backendUserProfile.model";
import makeBackendUserProfileSql from "../../../preMain/backendUserProfile.sql";

type input = {
  userId: string
}

export default function getOneByUserId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUserProfile>>> => {

    const userProfileSql = makeBackendUserProfileSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "'userId' is missing.",
        errorIdentifier: "backendUserAccount_getOneByUserId_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "backendUserAccount_getOneByUserId_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userProfileSql.getOneByUserId({
      userId: args.userId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}