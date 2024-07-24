import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectBackgroundColor from "../../../../../../../models/subDomain/backend/project/backendProjectBackgroundColor.model";
import makeBackendProjectBackgroundColorSql from "../../../preMain/backendProjectBackgroundColor.sql";

type input = {
  projectId: string
  backgroundColor_day?: string
  backgroundColor_night?: string
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectBackgroundColor> | null>> => {

    const sql = makeBackendProjectBackgroundColorSql(d);

    const response = await sql.addOne({
      projectId: args.projectId,
      backgroundColor_day: args.backgroundColor_day,
      backgroundColor_night: args.backgroundColor_night,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}