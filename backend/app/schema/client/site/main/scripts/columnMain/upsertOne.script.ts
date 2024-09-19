import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSiteColumn from "../../../../../../models/client/site/clientSiteColumn.model";
import makeClientSiteColumnSql from "../../../preMain/clientSiteColumn.sql";

type input = {
  id?: string
  width?: string
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSiteColumn> | null>> => {

    const sql = makeClientSiteColumnSql(d);

    const response = await sql.upsertOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}