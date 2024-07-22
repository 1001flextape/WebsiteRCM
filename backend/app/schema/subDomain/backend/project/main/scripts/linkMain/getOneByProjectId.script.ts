import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectLink from "../../../../../../../models/subDomain/backend/project/backendProjectLink.model";
import makeBackendProjectLinkSql from "../../../preMain/backendProjectLink.sql";

type input = {  
  projectId: string
}

export default function getOneByProjectId(d: dependencies) {
  return async (where: input): Promise<returningSuccessObj<Model<backendProjectLink> | null>> => {

    const sql = makeBackendProjectLinkSql(d);

    const response = sql.getOneByProjectId(where).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}