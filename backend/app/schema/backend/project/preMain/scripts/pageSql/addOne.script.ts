import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPage from "../../../../../../models/backend/project/backendProjectPage.model";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";

type input = { 
  projectId: string
  slug: string
  status?: PageStatusEnum,
  isNew?: boolean
  isChanged?: boolean
  isDeleted?: boolean
}

export default function addOne(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPage> | null>> => {

    const data = await db.backendProjectPage.create(
      args,
      {
        transaction: d.dbTransaction,
        returning: true,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


