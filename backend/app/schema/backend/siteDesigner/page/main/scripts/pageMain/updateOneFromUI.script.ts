import _ from "lodash";
import { Model } from "sequelize";
import backendSiteDesignerPage, { PageStatusEnum } from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesignerPage.sql";
import makeBackendSiteDesignerPageValidation from "../../../preMain/backendSiteDesignerPage.validation";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
  slug?: string
  isReady?: boolean
  //   isPublished?: boolean,
  //   isChanged?: boolean,
  isDraft?: boolean,
  status?: PageStatusEnum,
  //   isRecentlyCreated?: boolean,
  //   isRecentlyDeleted?: boolean,
}

export default function updateOneFromUI(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPage> | null>> => {

    const pageSql = makeBackendSiteDesignerPageSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesignerPage_updateOneFromUI_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesignerPage_updateOneFromUI_error:0001"
      })
    }

    if (args.isDraft) {
      args.status = PageStatusEnum.Draft;
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.updateOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}