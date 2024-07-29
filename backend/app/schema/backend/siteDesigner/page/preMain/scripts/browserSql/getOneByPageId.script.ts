import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageBrowser from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPageBrowser.model";

type input = {
  pageId: string
}

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageBrowser> | null>> => {

    const data = await db.backendSiteDesignerPageBrowser.findOne({
      where,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}