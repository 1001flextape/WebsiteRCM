import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendSettingOrganizationSql from "../../../preMain/backendSettingOrganization.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingOrganization from "../../../../../../../models/backend/setting/backendSettingOrganization.model";

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
  isChanged?: boolean,
  isReady?: boolean,
}

export default function updateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingOrganization> | null>> => {

    const backendUserRequestSql = makeBackendSettingOrganizationSql(d);
    
    const response = backendUserRequestSql.upsertOne({
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
      isChanged: args.isChanged,
      isReady: args.isReady,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}