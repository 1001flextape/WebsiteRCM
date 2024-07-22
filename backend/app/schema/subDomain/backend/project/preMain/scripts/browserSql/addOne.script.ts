import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectBrowser from "../../../../../../../models/subDomain/backend/project/backendProjectBrowser.model";

type input = {
  projectId: string

  id?: string
  favicon?: string
  tab?: string
  isReady?: boolean
}

export default function addOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectBrowser> | null>> => {
    
    // Create new instance
    const instance = await db.backendProjectBrowser.create(args, {
      transaction: d.subDomainTransaction,
    })
    // .catch(error => d.errorHandler(error, d.loggers))

    // Return the newly created instance
    return {
      success: true,
      data: instance,
    }
  }
}
