import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import makeBackendMediaManagerFolderSql from "../../../preMain/backendMediaManagerFolder.sql";
import stringHelpers from "../../../../../utils/stringHelpers";
import backendMediaManagerFolder from "../../../../../../models/backend/mediaManager/backendMediaManagerFolder.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { 
  name: string 
  createdBy: string
  folderId?: string
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendMediaManagerFolder> | null>> => {

    const folderSql = makeBackendMediaManagerFolderSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.name) {
      return endMainFromError({
        hint: "Datapoint 'name' is missing.",
        errorIdentifier: "backendMediaManagerFolder_addOne_error:0001"
      })
    }
    if (args.name.length === 0) {
      return endMainFromError({
        hint: "Datapoint 'name' is missing.",
        errorIdentifier: "backendMediaManagerFolder_addOne_error:0001"
      })
    }

    if (!args.createdBy) {
      return endMainFromError({
        hint: "Datapoint 'createdBy' is not UUID format.",
        errorIdentifier: "backendMediaManagerFolder_addOne_error:0002"
      })
    }

    const isCreatedByUuid = stringHelpers.isStringValidUuid({
      str: args.createdBy
    })

    if (!isCreatedByUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'createdBy' is not UUID format.",
        errorIdentifier: "backendMediaManagerFolder_addOne_error:0004"
      })
    }

    if (args.folderId) {
      const isFolderIdUuid = stringHelpers.isStringValidUuid({
        str: args.folderId
      })

      if (!isFolderIdUuid.result) {
        return endMainFromError({
          hint: "Datapoint 'folderId' is not UUID format.",
          errorIdentifier: "backendMediaManagerFolder_addOne_error:0005"
        })
      }
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await folderSql.addOne({
      createdBy: args.createdBy,
      name: args.name,
      folderId: args.folderId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
