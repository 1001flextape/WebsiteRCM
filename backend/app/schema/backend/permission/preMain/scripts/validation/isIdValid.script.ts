import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { id: string }

export default function isIdValid(d: dependencies) {

  const db = d.db.models;

  return async ({ id }: input) => {

    const data = await db.backendPermission.count({
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


