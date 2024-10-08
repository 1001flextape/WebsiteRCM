import { Model } from "sequelize";
import backendMediaManagerFile from "../../../../../../models/backend/mediaManager/backendMediaManagerFile.model";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendMediaManagerFileSql from "../../../preMain/backendMediaManagerFile.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  folderId?: string
}

export default function getMany(d: dependencies) {
  return async (args?: input): Promise<returningSuccessObj<Model<backendMediaManagerFile>[] | null>> => {

    const fileSql = makeBackendMediaManagerFileSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (args.folderId) {
      const isFolderIdUuid = stringHelpers.isStringValidUuid({
        str: args.folderId
      })

      if (!isFolderIdUuid.result) {
        return endMainFromError({
          hint: "Datapoint 'folderId' is not UUID format.",
          errorIdentifier: "backendMediaManagerFile_getMany_error:0001"
        })
      }
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await fileSql.getMany({
      folderId: args.folderId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
