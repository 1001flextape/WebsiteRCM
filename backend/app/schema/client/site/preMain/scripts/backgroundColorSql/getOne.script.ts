import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSiteBackgroundColor from "../../../../../../models/client/site/clientSiteBackgroundColor.model";

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<clientSiteBackgroundColor> | null>> => {

    const data = await db.clientSiteBackgroundColor.findOne({
      transaction: d.dbTransaction,
      order: [['createdAt', 'DESC']]
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}