import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendSettingFontSql from "../../../preMain/backendSettingFont.sql";
import backendSettingFont from "../../../../../../../models/backend/setting/backendSettingFont.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  font?: string
  varient?: string
  isChanged?: boolean
  isReady?: boolean
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingFont> | null>> => {

    const sql = makeBackendSettingFontSql(d);
    
    const response = sql.upsertOne({
      font: args.font,
      varient: args.varient,
      isChanged: args.isChanged,
      isReady: args.isReady,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}