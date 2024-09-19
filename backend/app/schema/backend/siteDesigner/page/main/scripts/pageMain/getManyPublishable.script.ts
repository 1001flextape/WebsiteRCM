import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPage from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesignerPage.sql";

export default function getManyPublishable(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPage>[] | null>> => {

    const sql = makeBackendSiteDesignerPageSql(d);

    const response = sql.getManyPublishable().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}