import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPage, { PageStatusEnum } from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
import { Op } from "sequelize";

export default function getManyPublishable(d: dependencies) {
  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPage>[]>> => {

    const data = await db.backendSiteDesignerPage.findAll({
      where: {
        status: {
          [Op.or]: [
            PageStatusEnum.New,
            PageStatusEnum.Published,
          ]
        }
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    return {
      success: true,
      data: data || [],
    };
  };
}