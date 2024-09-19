import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { PageStatusEnum } from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
import { Op } from "sequelize";
import backendSiteDesignerPageSectionLoud from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPageSectionLoud.model";

export default function getManyPublishable(d: dependencies) {
  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionLoud>[]>> => {

    // Query to return backendSiteDesignerPageSectionLoud, filtered by backendSiteDesignerPage status
    const data = await db.backendSiteDesignerPageSectionLoud.findAll({
      include: [{
        model: db.backendSiteDesignerPage,  // Join with backendSiteDesignerPage
        where: {
          status: {
            [Op.or]: [
              PageStatusEnum.New,
              PageStatusEnum.Published,
            ]
          }
        },
        required: true  // Ensures only rows with matching page status are returned
      }],
      logging: true,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    return {
      success: true,
      data: data || [],
    };
  };
}
