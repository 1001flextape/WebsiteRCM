import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectOrganization from "../../../../../../models/backend/project/backendProjectOrganization.model";
import makeBackendProjectOrganizationSql from "../../../preMain/backendProjectOrganization.sql";

type input = {  
  projectId: string
}

export default function getOneByProjectId(d: dependencies) {
  return async (where: input): Promise<returningSuccessObj<Model<backendProjectOrganization> | null>> => {

    const sql = makeBackendProjectOrganizationSql(d);

    const response = sql.getOneByProjectId(where).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}