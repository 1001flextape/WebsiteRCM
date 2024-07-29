import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionNormalBuiltIn from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPageSectionNormalBuiltIn.model";

type input = {
  id: string;
}

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormalBuiltIn> | null>> => {

    const data = await db.backendSiteDesignerPageSectionNormalBuiltIn.findOne({
      where: {
        id: args.id
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}