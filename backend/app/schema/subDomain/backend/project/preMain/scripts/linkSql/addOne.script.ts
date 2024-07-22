import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectLink from "../../../../../../../models/subDomain/backend/project/backendProjectLink.model";

type input = {
  projectId: string,
  
  id?: string
  title?: string
  description?: string
  image?: string
  isReady?: boolean
}

export default function addOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectLink> | null>> => {
    
    // Create new instance
    const instance = await db.backendProjectLink.create(args, {
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    // Return the newly created instance
    return {
      success: true,
      data: instance,
    }
  }
}
