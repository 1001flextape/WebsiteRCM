import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

type input = { id: string }

export default function deleteOne(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<number | null>> => {

    // set is recently deleted
    await db.backendSiteDesignerPage.update(
      {
        isRecentlyDeleted: true,
      },
      {
        where,
        transaction: d.subDomainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    // delete
    const data = await db.backendSiteDesignerPage.destroy({
      where,
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


