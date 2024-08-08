import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendSettingAllSql from "../../preMain/backendSettingAll.sql";

export default function isWebsiteSettingReady(d: dependencies) {
  return async (): Promise<returningSuccessObj<null>> => {

    const sql = makeBackendSettingAllSql(d);

    const response = sql.isWebsiteSettingReady().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}