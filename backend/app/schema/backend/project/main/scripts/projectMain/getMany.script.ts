import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProject from "../../../../../../models/backend/project/backendProject.model";
import makeBackendProjectSql from "../../../preMain/backendProject.sql";

export default function getMany(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendProject>[] | null>> => {

    const sql = makeBackendProjectSql(d);

    const response = sql.getMany().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}