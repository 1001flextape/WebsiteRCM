// getOneByPageId
import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendProjectPageBrowserSql from "../../../preMain/backendProjectPageBrowser.sql";
import backendProjectPageBrowser from "../../../../../../models/backend/project/backendProjectPageBrowser.model";

type input = {
  projectId: string
}

export default function getManyByProjectId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageBrowser>[] | null>> => {

    const sql = makeBackendProjectPageBrowserSql(d);

    const response = sql.getManyByProjectId(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}