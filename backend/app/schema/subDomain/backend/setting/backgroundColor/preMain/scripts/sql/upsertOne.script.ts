import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingBackgroundColor from "../../../../../../../../models/subDomain/backend/setting/backendSettingBackgroundColor.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id?: string
  backgroundColor_day?: string
  backgroundColor_night?: string
  isChanged?: boolean
  isReady?: boolean
}

export default function upsertOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSettingBackgroundColor> | null>> => {

    // Use upsert instead of separate create or update
    const [instance, created] = await db.backendSettingBackgroundColor.upsert(args, {
      returning: true,
      transaction: d.subDomainTransaction,
    })
    // .catch(error => d.errorHandler(error, d.loggers))

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
