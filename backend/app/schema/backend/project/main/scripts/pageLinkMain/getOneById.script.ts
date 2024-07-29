import { Model } from "sequelize";
import makeBackendProjectPageLinkSql from "../../../preMain/backendProjectPageLink.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageLink from "../../../../../../models/backend/project/backendProjectPageLink.model";

type input = {
  id: string
}

export default function getOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageLink> | null>> => {

    const sql = makeBackendProjectPageLinkSql(d);

    const response = sql.getOneById({
      id: args.id,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}