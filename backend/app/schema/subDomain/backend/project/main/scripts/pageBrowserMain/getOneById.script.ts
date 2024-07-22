import { Model } from "sequelize";
import makeBackendProjectPageBrowserSql from "../../../preMain/backendProjectPageBrowser.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageBrowser from "../../../../../../../models/subDomain/backend/project/backendProjectPageBrowser.model";

type input = {
  id: string
}

export default function getOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageBrowser> | null>> => {

    const sql = makeBackendProjectPageBrowserSql(d);

    const response = sql.getOneById({
      id: args.id,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}