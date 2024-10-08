import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionNormalBuiltIn from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPageSectionNormalBuiltIn.model";

export default function getMany(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormalBuiltIn>[] | null>> => {

    const data = await db.backendSiteDesignerPageSectionNormalBuiltIn.findAll({
      transaction: d.dbTransaction,
      order: [['createdAt', 'DESC']]
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}