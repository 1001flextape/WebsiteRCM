import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingEmail from "../../../../../../../models/backend/setting/backendSettingEmail.model";
import makeBackendSettingEmailSql from "../../../preMain/backendSettingEmail.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingEmail> | null>> => {

    const sql = makeBackendSettingEmailSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}