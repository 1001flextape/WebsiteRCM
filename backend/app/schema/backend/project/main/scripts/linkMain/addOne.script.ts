import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectLink from "../../../../../../models/backend/project/backendProjectLink.model";
import makeBackendProjectLinkSql from "../../../preMain/backendProjectLink.sql";

type input = {
  projectId: string

  id?: string
  title?: string
  description?: string
  image?: string
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectLink> | null>> => {

    const sql = makeBackendProjectLinkSql(d);
    
    const response = sql.addOne({
      projectId: args.projectId,

      id: args.id,
      title: args.title,
      description: args.description,
      image: args.image,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}