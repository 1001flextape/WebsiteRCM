import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingSite from "../../../../../../../models/backend/setting/backendSettingSite.model";
import makeBackendSettingSiteSql from "../../../preMain/backendSettingSite.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function resetIsChanged(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingSite> | null>> => {

    const sql = makeBackendSettingSiteSql(d);

    const response = sql.resetIsChanged().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}