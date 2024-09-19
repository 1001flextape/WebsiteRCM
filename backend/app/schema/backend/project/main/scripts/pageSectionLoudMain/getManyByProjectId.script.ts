// getOneByPageId
import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageLink from "../../../../../../models/backend/project/backendProjectPageLink.model";
import makeBackendProjectPageSectionLoudSql from "../../../preMain/backendProjectPageSectionLoud.sql";
import backendProjectPageSectionLoud from "../../../../../../models/backend/project/backendProjectPageSectionLoud.model";

type input = {
  projectId: string
}

export default function getManyByProjectId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageSectionLoud>[] | null>> => {

    const sql = makeBackendProjectPageSectionLoudSql(d);

    const response = sql.getManyByProjectId(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}