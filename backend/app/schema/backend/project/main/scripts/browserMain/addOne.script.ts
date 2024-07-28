import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectBrowser from "../../../../../../models/backend/project/backendProjectBrowser.model";
import makeBackendProjectBrowserSql from "../../../preMain/backendProjectBrowser.sql";

type input = {
  projectId: string

  id?: string
  favicon?: string
  tab?: string
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectBrowser> | null>> => {

    const sql = makeBackendProjectBrowserSql(d);

    const response = await sql.addOne({
      projectId: args.projectId,
      id: args.id || undefined,
      favicon: args.favicon,
      tab: args.tab,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}