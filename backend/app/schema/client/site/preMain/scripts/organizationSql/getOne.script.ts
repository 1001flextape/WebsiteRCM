import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSiteOrganization from "../../../../../../models/client/site/clientSiteOrganization.model";

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<clientSiteOrganization> | null>> => {

    const data = await db.clientSiteOrganization.findOne({
      transaction: d.dbTransaction,
      order: [['createdAt', 'DESC']]


    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}