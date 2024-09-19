import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSiteBackgroundColor from "../../../../../../models/client/site/clientSiteBackgroundColor.model";
import makeClientSiteBackgroundColorSql from "../../../preMain/clientSiteBackgroundColor.sql";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<clientSiteBackgroundColor> | null>> => {

    const sql = makeClientSiteBackgroundColorSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}