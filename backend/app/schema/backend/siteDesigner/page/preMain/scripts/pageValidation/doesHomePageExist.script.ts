import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function doesHomePageExist(d: dependencies) {

  const db = d.db.models;

  return async () => {

    const data: number = await db.backendSiteDesignerPage.count({
      where: {
        slug: "/"
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data !== 0,
    }
  }
}


