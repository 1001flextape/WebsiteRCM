import _ from "lodash";
import { Model } from "sequelize";
import makeBackendProjectSql from "../../../preMain/backendProject.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProject from "../../../../../../models/backend/project/backendProject.model";

export default function getCurrentOne(d: dependencies) {

  return async (): Promise<returningSuccessObj<Model<backendProject> | null>> => {

    const pageSql = makeBackendProjectSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.getCurrentProject().catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}