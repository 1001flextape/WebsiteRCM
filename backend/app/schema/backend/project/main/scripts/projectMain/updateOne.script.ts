import _ from "lodash";
import { Model } from "sequelize";
import makebackendProjectSql from "../../../preMain/backendProject.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../utils/stringHelpers";
import backendProject from "../../../../../../models/backend/project/backendProject.model";

type input = {
  id: string
  color?: string
  name?: string
  startedAt?: Date
  endedAt?: Date
}


export default function updateOne(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendProject> | null>> => {

    const publishSql = makebackendProjectSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendProject_updateOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendProject_updateOne_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await publishSql.updateOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}