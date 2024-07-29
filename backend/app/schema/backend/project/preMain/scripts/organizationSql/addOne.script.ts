import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectOrganization from "../../../../../../models/backend/project/backendProjectOrganization.model";

type input = {
  projectId: string;

  id?: string;
  logo?: string;
  name?: string;
  shouldApplyToTopNavMenu?: boolean;
  addressLine1?: string;
  addressLine2?: string;
  cityLocality?: string;
  stateProvinceRegion?: string;
  postalCode?: string;
  socialFacebook?: string;
  socialX?: string;
  socialInstagram?: string;
  socialLinkedIn?: string;
  socialYouTube?: string;
  socialPinterest?: string;
  socialWhatsapp?: string;
  socialReddit?: string;
}

export default function addOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectOrganization> | null>> => {
    try {
      // Find the existing record by projectId
      let instance = await db.backendProjectOrganization.findOne({
        where: { projectId: args.projectId },
        transaction: d.dbTransaction,
      });

      if (instance) {
        // Update the existing record
        instance = await instance.update(args, {
          transaction: d.dbTransaction,
        });
      } else {
        // Create a new record
        instance = await db.backendProjectOrganization.create(args, {
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
      };
    }
  };
}
