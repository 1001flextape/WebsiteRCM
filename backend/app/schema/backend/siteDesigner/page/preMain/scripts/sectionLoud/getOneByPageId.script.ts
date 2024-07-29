import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionLoud from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPageSectionLoud.model";

type Input = {
  pageId: string;
};

export default function getOneByPageId(d: dependencies) {
  const db = d.db.models;

  return async (args: Input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionLoud> | null>> => {
    const { pageId } = args;

    try {
      const data = await db.backendSiteDesignerPageSectionLoud.findOne({
        where: { pageId },
        transaction: d.dbTransaction,
        order: [['createdAt', 'DESC']],
      });

      return {
        success: true,
        data: data || null,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        data: null,
      };
    }
  };
}
