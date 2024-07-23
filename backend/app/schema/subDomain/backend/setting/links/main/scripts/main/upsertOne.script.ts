import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSettingLinkSql from "../../../preMain/backendSettingLink.sql";
import backendSettingLink from "../../../../../../../../models/subDomain/backend/setting/backendSettingLink.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  title?: string
  description?: string
  image?: string
  isChanged?: boolean
  isReady?: boolean
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingLink> | null>> => {

    const sql = makeBackendSettingLinkSql(d);
    
    const response = sql.upsertOne({
      title: args.title,
      description: args.description,
      image: args.image,
      isChanged: args.isChanged,
      isReady: args.isReady,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}