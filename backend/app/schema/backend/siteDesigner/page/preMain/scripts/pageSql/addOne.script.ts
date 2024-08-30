import { Model } from "sequelize";
import backendSiteDesignerPage, { PageStatusEnum } from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  isReady?: boolean,
  slug: string,
  status?: PageStatusEnum,
  isChanged?: boolean,
  isRecentlyCreated?: boolean,
  isRecentlyDeleted?: boolean,
}

export default function addOne(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPage> | null>> => {

    const data = await db.backendSiteDesignerPage.create(
      args,
      {
        transaction: d.dbTransaction,
        returning: true,
      }
    )
    // .catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


