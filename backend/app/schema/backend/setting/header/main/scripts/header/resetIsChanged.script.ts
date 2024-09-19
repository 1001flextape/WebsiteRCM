import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingHeader from "../../../../../../../models/backend/setting/backendSettingHeader.model";
import makeBackendSettingHeaderSql from "../../../preMain/backendSettingHeader.sql";


export default function resetIsChanged(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingHeader> | null>> => {

    const sql = makeBackendSettingHeaderSql(d);

    const response = sql.resetIsChanged().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}