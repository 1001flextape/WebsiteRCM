import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types"
import makeBackendAuthFunc from "../../../preMain/backendAuth.func"
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func"
import { isStringValidEmail } from "../../../../../utils/stringHelpers/checkEmail"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendUserMain from "../../../../user/main/backendUser.main"
import makeBackendUserValidation from "../../../../user/preMain/backendUser.validation"

type returningTokenObj = {
  token?: string,
  userId?: string,
}

type input = {
  email: string,
  password: string,
}

export default function signIn(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<returningTokenObj>> => {
    // if production, early return
    if (process.env.NODE_ENV === "production") {
      return {
        success: false,
        result: false,
      }
    }

    const { email, password, } = args

    const backendUserMain = makeBackendUserMain(d)
    const backendUserValidation = makeBackendUserValidation(d)
    const backendAuthFunc = makeBackendAuthFunc(d)
    // const lookUpCookieCache = makeBackendAuthCache(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.email) {
      return endMainFromError({
        hint: "Email is missing.",
        errorIdentifier: "backendAuth_signIn_error:0001"
      })
    }

    const isEmailValid = isStringValidEmail({
      str: args.email,
    })

    if (!isEmailValid.result) {
      return endMainFromError({
        hint: "Email is not a valid email.",
        errorIdentifier: "backendAuth_signIn_error:0002"
      })
    }

    if (!args.password) {
      return endMainFromError({
        hint: "Password is missing.",
        errorIdentifier: "backendAuth_signIn_error:0003"
      })
    }

    if (args.password.length === 0) {
      return endMainFromError({
        hint: "Password is missing.",
        errorIdentifier: "backendAuth_signIn_error:0004"
      })
    }

    const userEmail = await backendUserValidation.isEmailTaken({
      email: args.email,
    })

    // email is not taken in datatable means the email has no record to check
    if (!userEmail.result) {
      return endMainFromError({
        hint: "Authorization Failed",
        errorIdentifier: "backendAuth_signIn_error:0000"
      })
    }

    const user = await backendUserMain.getOneByEmail({
      email: args.email,
    })

    if (user.data.dataValues.isDeactivated) {
      return endMainFromError({
        hint: "Your account has been deactivated by an administrator. Please contact support for further assistance.",
        errorIdentifier: "backendAuth_signIn_error:0005"
      })
    }

    // check for temporary password:
    if (user.data?.dataValues?.temporaryPassword) {
      if (user.data?.dataValues?.temporaryPassword === args.password) {

        return endMainFromError({
          hint: "Change Temporary Password.",
          errorIdentifier: "backendAuth_signIn_error:1000",
          data: {
            userId: user.data.dataValues.id,
          }
        })
      } else {
        return endMainFromError({
          hint: "Authorization Failed",
          errorIdentifier: "backendAuth_signIn_error:0000"
        })
      }

    }

    

    const isPasswordCorrect = await backendUserValidation.isPasswordCorrect({
      encryptedPassword: user.data.dataValues.password,
      password,
    })

    if (!isPasswordCorrect.result) {
      return endMainFromError({
        hint: "Authorization Failed",
        errorIdentifier: "backendAuth_signIn_error:0000"
      })
    }

    const token = await backendAuthFunc.signinToken({ userId: user.data.dataValues.id })

    
    //reddis storage matching with cookie
    // const cookie = await lookUpCookieCache.lookupCookieTokenSet({
    //   token: token.data,
    // })

    return {
      success: true,
      data: {
        token: token.data,
      },
    }
  }
}