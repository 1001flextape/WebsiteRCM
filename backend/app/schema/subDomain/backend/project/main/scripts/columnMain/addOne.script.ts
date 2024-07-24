import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectColumn from "../../../../../../../models/subDomain/backend/project/backendProjectColumn.model";
import makeBackendProjectColumnSql from "../../../preMain/backendProjectColumn.sql";

type input = {
  projectId: string

  width?: string
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectColumn> | null>> => {

    const sql = makeBackendProjectColumnSql(d);

    const response = await sql.addOne({
      projectId: args.projectId,
      width: args.width,

    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}