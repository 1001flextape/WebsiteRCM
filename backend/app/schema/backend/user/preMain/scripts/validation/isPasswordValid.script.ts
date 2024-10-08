import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";

type input = { password: string }

export default function isPasswordValid(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<null>> => {
    const { password } = args;

    const findOne = await db.backendSettingPassword.findOne().catch(error => d.errorHandler(error, d.loggers))
    const passwordRules = findOne.dataValues;

    if (password.length < passwordRules.passwordLength) {

      return {
        success: true,
        result: false,
        humanMessage: `Password but be a minimum of length of ${passwordRules.passwordLength}.`
      }
    }

    if (passwordRules.shouldHaveUppercaseLetter && !/[A-Z]/.test(password)) {
      return {
        success: true,
        result: false,
        humanMessage: `One uppercase character required.`
      }
    }

    if (passwordRules.shouldHaveLowercaseLetter && !/[a-z]/.test(password)) {
      return {
        success: true,
        result: false,
        humanMessage: `One lowercase character required.`
      }
    }

    if (passwordRules.shouldHaveLowercaseLetter && !/\d/.test(password)) {
      return {
        success: true,
        result: false,
        humanMessage: `One number required.`
      }
    }

    if (
      passwordRules.shouldHaveSymbol &&
      !/[|\\/~^:,;?!&%$@*+]/.test(password)
    ) {
      return {
        success: true,
        result: false,
        humanMessage: `One symbol required.`
      }
    }

    return {
      success: true,
      result: true
    }
  }
}

