import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSiteBackgroundColor from "../../../../../../models/client/site/clientSiteBackgroundColor.model";
import makeClientSiteBackgroundColorSql from "../../../preMain/clientSiteBackgroundColor.sql";

type input = {
  id?: string
  backgroundColor_day?: string
  backgroundColor_night?: string
}


export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSiteBackgroundColor> | null>> => {

    const sql = makeClientSiteBackgroundColorSql(d);

    const response = await sql.upsertOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}