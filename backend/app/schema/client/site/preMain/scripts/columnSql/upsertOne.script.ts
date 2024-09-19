import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSiteColumn from "../../../../../../models/client/site/clientSiteColumn.model";

type input = {
  id?: string
  width?: string
}

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<clientSiteColumn> | null>> => {
    
    // Use upsert instead of separate create or update
    const [instance, created] = await db.clientSiteColumn.upsert(args, {
      returning: true,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    // `created` is a boolean indicating whether a new instance was created
    // `instance` is the model instance itself
    if (created) {
      // New instance created
      return {
        success: true,
        data: instance,
      }
    } else {
      // Existing instance updated
      return {
        success: true,
        data: instance,
      }
    }
  }
}
