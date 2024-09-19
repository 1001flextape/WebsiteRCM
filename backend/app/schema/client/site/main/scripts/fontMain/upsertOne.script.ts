import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSiteFont from "../../../../../../models/client/site/clientSiteFont.model";
import makeClientSiteFontSql from "../../../preMain/clientSiteFont.sql";

type input = {
  id?: string
  font?: string
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSiteFont> | null>> => {

    const sql = makeClientSiteFontSql(d);

    const response = await sql.upsertOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}