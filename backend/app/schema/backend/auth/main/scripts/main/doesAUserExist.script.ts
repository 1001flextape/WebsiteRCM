import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendUserMain from "../../../../user/main/backendUser.main"
import makeBackendUserValidation from "../../../../user/preMain/backendUser.validation"


export default function doesAUserExist(d: dependencies) {
  return async (): Promise<returningSuccessObj<null>> => {

    const backendUserValidation = makeBackendUserValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    const response = await backendUserValidation.doesAUserExists()


    return response
  }
}