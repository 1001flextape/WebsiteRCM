import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendUserManyRoleSql from "../../../preMain/backendUserManyRole.sql";

type input = {
  id?: string
  userId: string
  roleId: string
}

export default function setList(d: dependencies) {

  return async (setArray: input[]): Promise<returningSuccessObj<null>> => {

    const userManyRoleSql = makeBackendUserManyRoleSql(d)

    const response = await userManyRoleSql.setList(setArray)

    return response
  }
}


