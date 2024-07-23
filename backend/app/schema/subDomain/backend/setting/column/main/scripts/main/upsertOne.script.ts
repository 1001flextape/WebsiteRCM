import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSettingColumnSql from "../../../preMain/backendSettingColumn.sql";
import backendSettingColumn from "../../../../../../../../models/subDomain/backend/setting/backendSettingColumn.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  width?: string
  isChanged?: boolean
  isReady?: boolean
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingColumn> | null>> => {

    const sql = makeBackendSettingColumnSql(d);
    
    const response = sql.upsertOne({
      width: args.width,
      isChanged: args.isChanged,
      isReady: args.isReady,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}