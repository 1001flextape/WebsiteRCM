import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingColors from "../../../../../../../models/backend/setting/backendSettingColors.model";
import makeBackendSettingColorsSql from "../../../preMain/backendSettingColors.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function resetIsChanged(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingColors> | null>> => {

    const sql = makeBackendSettingColorsSql(d);

    const response = sql.resetIsChanged().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}