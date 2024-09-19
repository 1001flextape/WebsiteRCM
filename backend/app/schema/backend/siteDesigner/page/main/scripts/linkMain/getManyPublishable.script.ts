import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionNormal from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPageSectionNormal.model";
import makeBackendSiteDesignerPageLinkSql from "../../../preMain/backendSiteDesignerPageLink.sql";

export default function getManyPublishable(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormal>[] | null>> => {

    const sql = makeBackendSiteDesignerPageLinkSql(d);

    const response = sql.getManyPublishable().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}