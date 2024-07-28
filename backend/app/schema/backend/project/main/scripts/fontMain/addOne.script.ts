import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectFont from "../../../../../../models/backend/project/backendProjectFont.model";
import makeBackendProjectFontSql from "../../../preMain/backendProjectFont.sql";

type input = {
  projectId: string

  id?: string
  font?: string
  varient?: string
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectFont> | null>> => {

    const sql = makeBackendProjectFontSql(d);

    const response = await sql.addOne({
      projectId: args.projectId,
      id: args.id,
      font: args.font,
      varient: args.varient,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}