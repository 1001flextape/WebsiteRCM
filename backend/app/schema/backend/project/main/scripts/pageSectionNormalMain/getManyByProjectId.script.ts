// getOneByPageId
import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionNormal from "../../../../../../models/backend/project/backendProjectPageSectionNormal.model";
import makeBackendProjectPageSectionNormalSql from "../../../preMain/backendProjectPageSectionNormal.sql";

type input = {
  projectId: string
}

export default function getManyByProjectId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageSectionNormal>[] | null>> => {

    const sql = makeBackendProjectPageSectionNormalSql(d);

    const response = sql.getManyByProjectId(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}