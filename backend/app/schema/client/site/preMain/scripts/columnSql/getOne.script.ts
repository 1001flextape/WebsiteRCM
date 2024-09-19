import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSiteColumn from "../../../../../../models/client/site/clientSiteColumn.model";

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<clientSiteColumn> | null>> => {

    const data = await db.clientSiteColumn.findOne({
      transaction: d.dbTransaction,
      order: [['createdAt', 'DESC']]
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}