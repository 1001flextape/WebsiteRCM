import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingColumn from "../../../../../../../../models/subDomain/backend/setting/backendSettingColumn.model";
import makeBackendSettingColumnSql from "../../../preMain/backendSettingColumn.sql";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingColumn> | null>> => {

    const sql = makeBackendSettingColumnSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}