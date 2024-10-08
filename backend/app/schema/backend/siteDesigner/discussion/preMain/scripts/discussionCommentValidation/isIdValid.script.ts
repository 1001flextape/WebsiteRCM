import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { 
  id: string 
}

export default function isIdValid(d: dependencies) {
  const db = d.db.models;

  return async (where: input) => {

    const data = await db.backendSiteDesignerDiscussionComment.count({
      where,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data === 1,
    }
  }
}


