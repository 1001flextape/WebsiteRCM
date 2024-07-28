import backendUserManyPermission from "../../../../../../models/backend/user/backendUserManyPermission.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";

type input = {
  userId: string
  permissionId: string
}

export default function addOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<backendUserManyPermission | null>> => {

    const data = await db.backendUserManyPermission.create(
      args,
      {
        transaction: d.dbTransaction,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


