import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func"
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types"
import makeFoundationAuthFunc from "../../../preMain/backendAuth.func"
import makeBackendUserMain from "../../../../user/main/backendUser.main"
import makeBackendUserValidation from "../../../../user/preMain/backendUser.validation"
import { isStringValidEmail } from "../../../../../utils/stringHelpers/checkEmail"

type returningTokenObj = {
  token: string
}

type input = {
  email: string,
  temporaryPassword: string,
  password: string,
  confirmPassword: string,
}

export default function changeTemporaryPassword(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<returningTokenObj>> => {

    const backendUserMain = makeBackendUserMain(d)
    const backendUserValidation = makeBackendUserValidation(d)

    const authFunc = makeFoundationAuthFunc(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.email) {
      return endMainFromError({
        hint: "Email is missing.",
        errorIdentifier: "backendAuth_changeTemporaryPassword_error:0001"
      })
    }

    const isEmailValid = isStringValidEmail({
      str: args.email,
    })

    if (!isEmailValid.result) {
      return endMainFromError({
        hint: "Email is not a valid email.",
        errorIdentifier: "backendAuth_changeTemporaryPassword_error:0002"
      })
    }

    if (!args.temporaryPassword) {
      return endMainFromError({
        hint: "'temporaryPassword' is missing.",
        errorIdentifier: "backendAuth_changeTemporaryPassword_error:0003"
      })
    }

    if (!args.password) {
      return endMainFromError({
        hint: "'password' is missing.",
        errorIdentifier: "backendAuth_changeTemporaryPassword_error:0004"
      })
    }

    if (!args.confirmPassword) {
      return endMainFromError({
        hint: "'confirmPassword' is missing.",
        errorIdentifier: "backendAuth_changeTemporaryPassword_error:0005"
      })
    }

    if (args.password !== args.confirmPassword) {
      return endMainFromError({
        hint: "'confirmPassword' doesn't match 'password'.",
        errorIdentifier: "backendAuth_changeTemporaryPassword_error:0006"
      })
    }

    const isPasswordValid = await backendUserValidation.isPasswordValid({
      password: args.password,
    })

    if (!isPasswordValid.result) {
      return endMainFromError({
        hint: isPasswordValid.humanMessage,
        errorIdentifier: "backendAuth_changeTemporaryPassword_error:0007"
      })
    }
    //////////////////////////////////////
    // Sql
    // ===================================

    const user = await backendUserMain.getOneByEmail({
      email: args.email,
    })

    if (user.data?.dataValues?.temporaryPassword !== args.temporaryPassword) {
      return endMainFromError({
        hint: "Not Authorized.",
        errorIdentifier: "backendAuth_changeTemporaryPassword_error:0008"
      })
    }

    if (user.data?.dataValues?.temporaryPassword === undefined || user.data?.dataValues?.temporaryPassword === null) {
      return endMainFromError({
        hint: "Not Authorized.",
        errorIdentifier: "backendAuth_changeTemporaryPassword_error:0009"
      })
    }

    // main logic
    await backendUserMain.changeTemporaryPassword({
      id: user.data.dataValues.id,
      temporaryPassword: args.temporaryPassword,
      password: args.password,
    })

    const token = await authFunc.signinToken({ userId: user.data.dataValues.id })

    return {
      success: true,
      data: {
        token: token.data,
      },
    }
  }
}