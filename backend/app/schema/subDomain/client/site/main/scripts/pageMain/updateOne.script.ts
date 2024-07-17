import _ from "lodash";
import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePage from "../../../../../../../models/subDomain/client/site/clientSitePage.model";
import makeClientSitePageSql from "../../../preMain/clientSitePage.sql";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";

type input = {
  id: string
  slug?: string
}

export default function updateOne(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<clientSitePage> | null>> => {

    const pageSql = makeClientSitePageSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "clientSitePage_updateOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "clientSitePage_updateOne_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.updateOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}