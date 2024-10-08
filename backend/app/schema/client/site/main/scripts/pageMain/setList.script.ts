import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";
import makeClientSitePageSql from "../../../preMain/clientSitePage.sql";

type input = {
  id?: string
  slug?: string
}

export default function setList(d: dependencies) {
  const { errorHandler, loggers } = d

  return async (args: input[]): Promise<returningSuccessObj<null>> => {

    const sql = makeClientSitePageSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args || args?.length === 0) {
      return endMainFromError({
        hint: "Please provide data.",
        errorIdentifier: "clientSitePage_setList_error:0001"
      })
    }

    for (let i = 0; i < args.length; i++) {
      const data = args[i];

      if (data.id) {
        const isIdUuid = stringHelpers.isStringValidUuid({
          str: data.id,
        })

        if (!isIdUuid.result) {
          return endMainFromError({
            hint: "'id' is provided but is not a UUID.",
            errorIdentifier: "clientSitePage_setList_error:0002"
          })
        }
      }
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await sql.setList(args).catch(error => errorHandler(error, loggers))

    return response
  }
}