import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSiteBackgroundColor from "../../../../../../models/client/site/clientSiteBackgroundColor.model";

type input = {
  id?: string
  backgroundColor_day?: string
  backgroundColor_night?: string
}

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<clientSiteBackgroundColor> | null>> => {
    
    // Use upsert instead of separate create or update
    const [instance, created] = await db.clientSiteBackgroundColor.upsert(args, {
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
