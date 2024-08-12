import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func"
import getRandomColor from "../../../../../utils/helpers/getRandomColor"
import stringHelpers from "../../../../../utils/stringHelpers"
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types"
import makeFoundationAuthFunc from "../../../preMain/backendAuth.func"
import makeBackendUserMain from "../../../../user/main/backendUser.main"
import makeBackendUserProfileMain from "../../../../user/main/backendUserProfile.main"
import makeBackendUserValidation from "../../../../user/preMain/backendUser.validation"
import { CallByTypeEnum } from "../../../../user/preMain/scripts/userProfileSql/upsertOne.script"

type returningTokenObj = {
  token: string
}

type input = {
  email: string,
  password: string,
  confirmPassword: string,
  username?: string,
}



export default function signup(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<returningTokenObj>> => {


    // const { userMain, userProfileMain, userProfileValidation } = makeFoundationUserEntity(d)
    const backendUserMain = makeBackendUserMain(d)
    const backendUserValidation = makeBackendUserValidation(d)
    
    const authFunc = makeFoundationAuthFunc(d)
    // const backendUserEntity = makeBackendUserEntity(d)
    // const lookUpCookieCache = makeBackendAuthCache(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.email) {
      return endMainFromError({
        hint: "Email is missing.",
        errorIdentifier: "backendAuth_signUp_error:0001"
      })
    }

    const isEmailValid = stringHelpers.isStringValidEmail({
      str: args.email
    })

    if (!isEmailValid) {
      return endMainFromError({
        hint: "Not a valid email.",
        errorIdentifier: "backendAuth_signUp_error:0002"
      })
    }

    const isEmailTaken = await backendUserValidation.isEmailTaken({
      email: args.email,
    }).catch(error => d.errorHandler(error, d.loggers))

    if (isEmailTaken.result) {
      return endMainFromError({
        hint: "Email is taken.",
        errorIdentifier: "backendAuth_signUp_error:0003"
      })
    }




    if (!args.password) {
      return endMainFromError({
        hint: "Password is missing.",
        errorIdentifier: "backendAuth_signUp_error:0004"
      })
    }

    if (!args.confirmPassword) {
      return endMainFromError({
        hint: "ConfirmPassword is missing.",
        errorIdentifier: "backendAuth_signUp_error:0005"
      })
    }

    if (args.password !== args.confirmPassword) {
      return endMainFromError({
        hint: "ConfirmPassword doesn't match.",
        errorIdentifier: "backendAuth_signUp_error:0006"
      })
    }

    const isPasswordValid = await backendUserValidation.isPasswordValid({
      password: args.password,
    })

    if (!isPasswordValid.result) {
      return endMainFromError({
        hint: isPasswordValid.humanMessage,
        errorIdentifier: "backendAuth_signUp_error:0007"
      })
    }
    //////////////////////////////////////
    // Sql
    // ===================================

    const user = await backendUserMain.addOne({
      email: args.email,
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