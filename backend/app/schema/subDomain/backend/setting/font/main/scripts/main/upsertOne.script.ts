import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSettingFontSql from "../../../preMain/backendSettingFont.sql";
import backendSettingFont from "../../../../../../../../models/subDomain/backend/setting/backendSettingFont.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id?: string
  font?: string
  varient?: string
  isChanged?: boolean
  isReady?: boolean
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingFont> | null>> => {

    const sql = makeBackendSettingFontSql(d);
    
    const response = sql.upsertOne({
      id: args.id,
      font: args.font,
      varient: args.varient,
      isChanged: args.isChanged,
      isReady: args.isReady,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}