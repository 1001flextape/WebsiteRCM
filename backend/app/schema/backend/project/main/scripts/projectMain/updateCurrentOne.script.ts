import _ from "lodash";
import { Model } from "sequelize";
import makebackendProjectSql from "../../../preMain/backendProject.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../utils/stringHelpers";
import backendProject from "../../../../../../models/backend/project/backendProject.model";

type input = {
  color?: string
  name?: string
  startedAt?: Date
  endedAt?: Date
}


export default function updateCurrentOne(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendProject> | null>> => {

    const publishSql = makebackendProjectSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await publishSql.updateCurrentOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}