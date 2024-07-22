import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectOrganization from "../../../../../../../models/subDomain/backend/project/backendProjectOrganization.model";
import makeBackendProjectOrganizationSql from "../../../preMain/backendProjectOrganization.sql";

type input = {
  projectId: string,

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

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectOrganization> | null>> => {

    const sql = makeBackendProjectOrganizationSql(d);
    
    const response = sql.addOne({
      projectId: args.projectId,
      id: args.id,
      logo: args.logo,
      name: args.name,
      shouldApplyToTopNavMenu: args.shouldApplyToTopNavMenu,
      addressLine1: args.addressLine1,
      addressLine2: args.addressLine2,
      cityLocality: args.cityLocality,
      postalCode: args.postalCode,
      socialFacebook: args.socialFacebook,
      socialInstagram: args.socialInstagram,
      socialLinkedIn: args.socialLinkedIn,
      socialPinterest: args.socialPinterest,
      socialReddit: args.socialReddit,
      socialWhatsapp: args.socialWhatsapp,
      socialX: args.socialX,
      socialYouTube: args.socialYouTube,
      stateProvinceRegion: args.stateProvinceRegion,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}