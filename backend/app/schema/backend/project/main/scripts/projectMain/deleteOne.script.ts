import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProject from "../../../../../../models/backend/project/backendProject.model";
import makeBackendProjectSql from "../../../preMain/backendProject.sql";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../utils/stringHelpers";

type input = {
  id: string
}

export default function deleteOne(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendProject> | null>> => {

    const publishSql = makeBackendProjectSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendProject_deleteOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendProject_deleteOne_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await publishSql.deleteOne({
      id: args.id
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}