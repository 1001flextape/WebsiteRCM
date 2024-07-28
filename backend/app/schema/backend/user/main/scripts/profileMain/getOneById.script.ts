import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import backendUserProfile from "../../../../../../models/backend/user/backendUserProfile.model";
import makeBackendUserProfileSql from "../../../preMain/backendUserProfile.sql";

type input = {
  id: string
}

export default function getOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUserProfile>>> => {

    const userProfileSql = makeBackendUserProfileSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "backendUserAccount_getOneById_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendUserAccount_getOneById_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userProfileSql.getOneById({
      id: args.id
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}