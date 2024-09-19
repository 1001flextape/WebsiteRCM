import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSiteFont from "../../../../../../models/client/site/clientSiteFont.model";
import makeClientSiteFontSql from "../../../preMain/clientSiteFont.sql";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<clientSiteFont> | null>> => {

    const sql = makeClientSiteFontSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}