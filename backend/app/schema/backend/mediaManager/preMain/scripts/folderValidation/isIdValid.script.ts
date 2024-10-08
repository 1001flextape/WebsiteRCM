import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";

type input = { id: string }

export default function isIdValid(d: dependencies) {

  const db = d.db.models;

  return async ({ id }: input): Promise<returningSuccessObj<null>> => {

    const data = await db.backendMediaManagerFolder.count({
      where: {
        id,
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data === 1,
    }
  }
}


