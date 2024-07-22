import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectFooter from "../../../../../../../models/subDomain/backend/project/backendProjectFooter.model";

type input = {  
  projectId: string
}

export default function getOneByProjectId(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendProjectFooter> | null>> => {

    const data = await db.backendProjectFooter.findOne({
      where,
      transaction: d.subDomainTransaction,
      order: [['createdAt', 'DESC']]
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}