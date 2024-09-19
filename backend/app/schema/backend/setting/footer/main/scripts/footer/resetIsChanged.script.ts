import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingFooter from "../../../../../../../models/backend/setting/backendSettingFooter.model";
import makeBackendSettingFooterSql from "../../../preMain/backendSettingFooter.sql";


export default function resetIsChanged(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingFooter> | null>> => {

    const sql = makeBackendSettingFooterSql(d);

    const response = sql.resetIsChanged().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}