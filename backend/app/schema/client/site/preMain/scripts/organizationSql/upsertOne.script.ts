import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSiteOrganization from "../../../../../../models/client/site/clientSiteOrganization.model";

type input = {
  id?: string,
  logo?: string,
  name?: string,
  shouldApplyToTopNavMenu?: boolean,
  addressLine1?: string,
  addressLine2?: string,
  cityLocality?: string,
  stateProvinceRegion?: string,
  postalCode?: string,
  socialFacebook?: string,
  socialX?: string,
  socialInstagram?: string,
  socialLinkedIn?: string,
  socialYouTube?: string,
  socialPinterest?: string,
  socialWhatsapp?: string,
  socialReddit?: string,
}

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<clientSiteOrganization> | null>> => {
    
    // Use upsert instead of separate create or update
    const [instance, created] = await db.clientSiteOrganization.upsert(args, {
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
