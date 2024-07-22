import _ from "lodash";
import { Model } from "sequelize";
import makeBackendProjectSql from "../../../preMain/backendProject.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProject from "../../../../../../../models/subDomain/backend/project/backendProject.model";

type input = { 
  name: string
  color: string
  startedAt?: Date
  endedAt?: Date
}

export default function addOne(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendProject> | null>> => {

    const pageSql = makeBackendProjectSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.addOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}