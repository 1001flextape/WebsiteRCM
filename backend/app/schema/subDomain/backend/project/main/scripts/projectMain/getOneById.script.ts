import { Model } from "sequelize";
import makeBackendProjectSql from "../../../preMain/backendProject.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProject from "../../../../../../../models/subDomain/backend/project/backendProject.model";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";

type input = {
  id: string
}

export default function getOneById(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendProject> | null>> => {

    const publishSql = makeBackendProjectSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendProject_getOneById_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendProject_getOneById_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await publishSql.getOneById({
      id: args.id
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
