import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectOrganization from "../../../../../../../models/subDomain/backend/project/backendProjectOrganization.model";

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
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectOrganization> | null>> => {
    try {
      // Find the existing record by projectId
      let instance = await db.backendProjectOrganization.findOne({
        where: { projectId: args.projectId },
        transaction: d.subDomainTransaction,
      });

      if (instance) {
        // Update the existing record
        instance = await instance.update(args, {
          transaction: d.subDomainTransaction,
        });
      } else {
        // Create a new record
        instance = await db.backendProjectOrganization.create(args, {
          transaction: d.subDomainTransaction,
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
