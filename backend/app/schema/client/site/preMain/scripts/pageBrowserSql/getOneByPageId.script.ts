import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSitePageBrowser from "../../../../../../models/client/site/clientSitePageBrowser.model";

type input = {
  pageId: string
}

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<clientSitePageBrowser> | null>> => {

    const data = await db.clientSitePageBrowser.findOne({
      where,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}