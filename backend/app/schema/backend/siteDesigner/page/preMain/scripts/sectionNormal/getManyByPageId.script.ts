import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionNormal from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPageSectionNormal.model";

type input = {
  pageId: string;
};

export default function getManyByPageId(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormal>[]>> => {
    const { pageId } = args;

    const data = await db.backendSiteDesignerPageSectionNormal.findAll({
      where: {
        pageId,
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    return {
      success: true,
      data: data || [],
    };
  };
}
