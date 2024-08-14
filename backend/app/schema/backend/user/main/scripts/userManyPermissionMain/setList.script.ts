import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendUserManyPermissionSql from "../../../preMain/backendUserManyPermission.sql";

type input = {
  id?: string
  userId: string
  permissionId: string
}

export default function setList(d: dependencies) {

  return async (setArray: input[]): Promise<returningSuccessObj<null>> => {

    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const response = await userManyPermissionSql.setList(setArray)

    return response
  }
}


