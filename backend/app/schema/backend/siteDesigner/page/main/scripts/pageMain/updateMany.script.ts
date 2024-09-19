import _ from "lodash";
import { Model } from "sequelize";
import backendSiteDesignerPage, { PageStatusEnum } from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesignerPage.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  where?: { [key: string]: any }, // where condition to filter the records
  paranoid?: boolean,
  isReady?: boolean,
  slug?: string,
  status?: PageStatusEnum,
  isChanged?: boolean,
  isRecentlyCreated?: boolean,
  isRecentlyDeleted?: boolean,
}

export default function updateMany(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPage> | null>> => {

    const pageSql = makeBackendSiteDesignerPageSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.updateMany(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}