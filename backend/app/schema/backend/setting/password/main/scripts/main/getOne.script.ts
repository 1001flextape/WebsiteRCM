import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeFoundationSettingPasswordSql from "../../../preMain/backendSettingPassword.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingPassword from "../../../../../../../models/backend/setting/backendSettingPassword.model";

export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingPassword> | null>> => {

    const passwordSql = makeFoundationSettingPasswordSql(d);

    const response = await passwordSql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}