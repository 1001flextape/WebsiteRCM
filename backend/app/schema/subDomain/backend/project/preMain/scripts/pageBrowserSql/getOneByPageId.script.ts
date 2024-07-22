import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageBrowser from "../../../../../../../models/subDomain/backend/project/backendProjectPageBrowser.model";

type input = {
  pageId: string
}

export default function getOneByPageId(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendProjectPageBrowser> | null>> => {

    const data = await db.backendProjectPageBrowser.findOne({
      where,
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}
