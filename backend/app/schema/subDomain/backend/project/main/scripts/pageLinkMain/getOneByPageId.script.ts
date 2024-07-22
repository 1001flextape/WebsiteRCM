import { Model } from "sequelize";
import makeBackendProjectPageLinkSql from "../../../preMain/backendProjectPageLink.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageLink from "../../../../../../../models/subDomain/backend/project/backendProjectPageLink.model";

type input = {
  pageId: string
}

export default function getOneByPageId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageLink> | null>> => {

    const sql = makeBackendProjectPageLinkSql(d);

    const response = sql.getOneByPageId({
      pageId: args.pageId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}