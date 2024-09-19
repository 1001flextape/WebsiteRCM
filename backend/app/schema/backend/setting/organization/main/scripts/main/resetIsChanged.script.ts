import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendSettingOrganizationSql from "../../../preMain/backendSettingOrganization.sql";
import backendSettingOrganization from "../../../../../../../models/backend/setting/backendSettingOrganization.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function resetIsChanged(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingOrganization> | null>> => {

    const sql = makeBackendSettingOrganizationSql(d);

    const response = sql.resetIsChanged().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}