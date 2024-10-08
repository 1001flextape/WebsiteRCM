import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";

type input = { id: string }

export default function deleteOne(d: dependencies) {

  const db = d.db.models;

  return async ({ id }: input): Promise<returningSuccessObj<number | null>> => {

    const data = await db.backendPermission.destroy({
      where: {
        id,
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


