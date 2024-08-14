import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"

// const canUserSignUp = require("./scripts/helpers/canUserSignUp.script")
import forgotPassword from "./scripts/main/forgotPassword.script"
import signin from "./scripts/main/signIn.script"
import signup from "./scripts/main/signUp.script"
import isTokenValid from "./scripts/main/isTokenValid.script"
import changeTemporaryPassword from "./scripts/main/changeTemporaryPassword.script"
import doesAUserExist from "./scripts/main/doesAUserExist.script"

export default function makeBackendAuthMain(d: dependencies) {

  return {
    forgotPassword: forgotPassword(d),
    signin: signin(d),
    signup: signup(d),
    isTokenValid: isTokenValid(d),
    changeTemporaryPassword: changeTemporaryPassword(d),
    doesAUserExist: doesAUserExist(d),
  }
}