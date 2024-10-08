import _ from "lodash";
import { Model } from "sequelize";
import makeBackendProjectPageSql from "../../../preMain/backendProjectPage.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPage from "../../../../../../models/backend/project/backendProjectPage.model";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";

type input = { 
  projectId: string
  slug: string
  status?: PageStatusEnum,
  isNew?: boolean
  isChanged?: boolean
  isDeleted?: boolean
}

export default function addOne(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPage> | null>> => {

    const pageSql = makeBackendProjectPageSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.slug) {
      return endMainFromError({
        hint: "Datapoint 'slug' not provided.",
        errorIdentifier: "backendProjectPage_addOne_error:0001"
      })
    }

    if (args.slug.length === 0) {
      return endMainFromError({
        hint: "Datapoint 'slug' not provided.",
        errorIdentifier: "backendProjectPage_addOne_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.addOne(args)
    // .catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}