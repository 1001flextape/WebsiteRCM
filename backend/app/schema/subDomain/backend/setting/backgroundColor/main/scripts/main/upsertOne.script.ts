import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSettingBackgroundColorSql from "../../../preMain/backendSettingBackgroundColor.sql";
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
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingBackgroundColor> | null>> => {

    const sql = makeBackendSettingBackgroundColorSql(d);
    
    const response = sql.upsertOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}