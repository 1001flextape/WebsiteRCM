import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingFont from "../../../../../../../../models/subDomain/backend/setting/backendSettingFont.model";
import makeBackendSettingFontSql from "../../../preMain/backendSettingFont.sql";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingFont> | null>> => {

    const sql = makeBackendSettingFontSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}