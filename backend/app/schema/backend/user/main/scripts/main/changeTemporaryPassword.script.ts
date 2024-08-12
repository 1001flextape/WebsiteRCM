import { Model } from "sequelize";
import bcrypt from "bcryptjs"
import backendUser from "../../../../../../models/backend/user/backendUser.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendUserSql from "../../../preMain/backendUser.sql";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import makeBackendUserValidation from "../../../preMain/backendUser.validation";

type input = {
  id: string;
  password?: string;
  temporaryPassword: string;
}


export default function changeTemporaryPassword(d: dependencies) {

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<backendUser> | null>> => {

    const backendUserSql = makeBackendUserSql(d)
    const backendUserValidation = makeBackendUserValidation(d)


    if (!args.password) {
      return endMainFromError({
        hint: "'password' required.",
        errorIdentifier: "backendUser_changeTemporaryPassword_error:0001"
      })
    }

    if (!args.temporaryPassword) {
      return endMainFromError({
        hint: "'temporaryPassword' required.",
        errorIdentifier: "backendUser_changeTemporaryPassword_error:0002"
      })
    }

    const isPasswordValid: returningSuccessObj<null> = await backendUserValidation.isPasswordValid({
      password: args.password,
    }).catch(error => d.errorHandler(error, d.loggers))

    if (!isPasswordValid.result) {
      return endMainFromError({
        hint: isPasswordValid.humanMessage,
        errorIdentifier: "backendUser_changeTemporaryPassword_error:0003"
      })
    }

    const currentUser = await backendUserSql.getOneById({
      id,
    })

    if (currentUser.data.dataValues.temporaryPassword !== args.temporaryPassword) {
      return endMainFromError({
        hint: "'temporaryPassword' is incorrect.",
        errorIdentifier: "backendUser_changeTemporaryPassword_error:0004"
      })
    }

    const response = await backendUserSql.changeTemporaryPassword({
      id,
      password: args.password,
    })

    return response
  }
}


