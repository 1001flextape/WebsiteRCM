import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";

type input = {
  id: string
  deletedBy: string
}

export default function deleteOne(d: dependencies) {

  const db = d.db.models;

  return async ({ id, deletedBy }: input): Promise<returningSuccessObj<number | null>> => {

    // show who deleted the record.
    await db.backendMediaManagerFile.update(
      { deletedBy, },
      {
        where: { id, },
        transaction: d.dbTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    const data = await db.backendMediaManagerFile.destroy({
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


