import isIdValid from "./scripts/validation/isIdValid.script"
import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import doesAUserExists from "./scripts/validation/doesAUserExist.script"
import isEmailTaken from "./scripts/validation/isEmailTaken.script"
import isPasswordCorrect from "./scripts/validation/isPasswordCorrect.script"
import isPasswordValid from "./scripts/validation/isPasswordValid.script"

export default function makeBackendUserValidation(d: dependencies) {
  return {
    isIdValid: isIdValid(d),
    doesAUserExists: doesAUserExists(d),
    isEmailTaken: isEmailTaken(d),
    isPasswordCorrect: isPasswordCorrect(d),
    isPasswordValid: isPasswordValid(d),
  }
}