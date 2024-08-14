import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types"
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func"
import { isStringValidEmail } from "../../../../../utils/stringHelpers/checkEmail"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendUserMain from "../../../../user/main/backendUser.main"

type input = {
  email: string
}

export default function forgotPassword(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<null>> => {

    const backendUserMain = makeBackendUserMain(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.email) {
      return endMainFromError({
        hint: "Email is missing.",
        errorIdentifier: "backendAuth_forgotPassword_error:0001"
      })
    }

    const isEmailValid = isStringValidEmail({
      str: args.email,
    })

    if (!isEmailValid.result) {
      return endMainFromError({
        hint: "Email is not a valid email.",
        errorIdentifier: "backendAuth_forgotPassword_error:0002"
      })
    }

    const user = await backendUserMain.getOneByEmail({
      email: args.email,
    })

    if (user?.data?.dataValues?.isDeactivated) {
      return endMainFromError({
        hint: "Your account has been deactivated by an administrator. Please contact support for further assistance.",
        errorIdentifier: "backendAuth_forgotPassword_error:0003"
      })
    }

    // const { settingEmailMain } = makeBackendSettingEmailEntity(d)


    // const settingEmail = await settingEmailMain.getOne()


    // const emailResponse = await sendEmail({
    //   to: args.email,
    //   from: process.env.SENDGRID_FROM,
    //   subject: settingEmail.data.dataValues.resetPasswordEmailSubject,
    //   text: settingEmail.data.dataValues.resetPasswordEmailMessage,
    // }).catch(errorHandler)

    return {
      success: true,
      // data: emailResponse,
    }
  }
}