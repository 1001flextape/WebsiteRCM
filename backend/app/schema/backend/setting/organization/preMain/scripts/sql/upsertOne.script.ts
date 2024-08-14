import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingOrganization from "../../../../../../../models/backend/setting/backendSettingOrganization.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
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
  isReady?: boolean,
  isChanged?: boolean,
}

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSettingOrganization> | null>> => {
    try {
      // Check if a record exists
      let instance = await db.backendSettingOrganization.findOne({
        transaction: d.dbTransaction,
      });

      if (instance) {
        // Update the existing record
        instance = await instance.update({
          ...args,
          isChanged: true,
        }, {
          transaction: d.dbTransaction,
        });
      } else {
        // Create a new record
        instance = await db.backendSettingOrganization.create({
          ...args,
          isChanged: true,
        }, {
          transaction: d.dbTransaction,
        });
      }

      return {
        success: true,
        data: instance,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        data: null,
        humanMessage: "Error during upsert operation",
      };
    }
  };
}
