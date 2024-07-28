import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import { Model } from "sequelize";
import backendUser from "../../../../../../models/backend/user/backendUser.model";
import makeBackendUserSql from "../../../preMain/backendUser.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string;
  email?: string;
  password?: string;
  isDeactivated?: boolean;
  isAdmin?: boolean;
}

export default function updateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUser>>> => {

    const userSql = makeBackendUserSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "backendUser_updateOne_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendUser_updateOne_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userSql.updateOne({
      id: args.id,
      email: args.email,
      password: args.password,
      isDeactivated: args.isDeactivated,
      isAdmin: args.isAdmin,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}