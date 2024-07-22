import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPage from "../../../../../../../models/subDomain/backend/project/backendProjectPage.model";
import makeBackendProjectPageSql from "../../../preMain/backendProjectPage.sql";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";

type input = {
  projectId: string
  slug: string
}

export default function getOneBySlug(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPage> | null>> => {

    const pageSql = makeBackendProjectPageSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.slug) {
      return endMainFromError({
        hint: "Datapoint 'slug' is has no value.",
        errorIdentifier: "backendProjectPage_getOneBySlug_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.getOneBySlug({
      projectId: args.projectId,
      slug: args.slug,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
