import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSiteBrowser from "../../../../../../models/client/site/clientSiteBrowser.model";

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<clientSiteBrowser> | null>> => {

    const data = await db.clientSiteBrowser.findOne({
      transaction: d.dbTransaction,
      order: [['createdAt', 'DESC']]
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}