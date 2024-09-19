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

export default function addMany(d: dependencies) {

  return async (args: input[]): Promise<returningSuccessObj<Model<backendProjectPage>[] | null>> => {

    const pageSql = makeBackendProjectPageSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.addMany(args)
    // .catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}