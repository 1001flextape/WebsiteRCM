import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPage from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";

type input = {
  id: string
  slug?: string
  isReady?: boolean
  isPublished?: boolean,
  isChanged?: boolean,
  isDraft?: boolean,
  isRecentlyCreated?: boolean,
  isRecentlyDeleted?: boolean,
}

export default function updateOne(d: dependencies) {

  const db = d.db.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<backendSiteDesignerPage> | null>> => {

    const data = await db.backendSiteDesignerPage.update(
      args,
      {
        where: { id, },
        returning: true,
        transaction: d.dbTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


