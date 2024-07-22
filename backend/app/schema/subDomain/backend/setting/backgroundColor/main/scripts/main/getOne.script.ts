import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingBackgroundColor from "../../../../../../../../models/subDomain/backend/setting/backendSettingBackgroundColor.model";
import makeBackendSettingBackgroundColorSql from "../../../preMain/backendSettingBackgroundColor.sql";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingBackgroundColor> | null>> => {

    const sql = makeBackendSettingBackgroundColorSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}