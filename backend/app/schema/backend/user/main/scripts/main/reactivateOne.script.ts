import { Model } from "sequelize";
import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import backendUser from "../../../../../../models/backend/user/backendUser.model";
import makeBackendUserSql from "../../../preMain/backendUser.sql";

type input = {
  id: string
}

export default function reactivateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUser>>> => {

    const userSql = makeBackendUserSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "backendUser_reactivateOne_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendUser_reactivateOne_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userSql.updateOne({
      id: args.id,
      isDeactivated: false,
    })

    return response
  }
}