import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { name: string }

export default function isNameTaken(d: dependencies) {

  const db = d.db.models;

  return async ({ name }: input) => {

    const data = await db.backendPermission.count({
      where: {
        name,
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data === 1,
    }
  }
}


