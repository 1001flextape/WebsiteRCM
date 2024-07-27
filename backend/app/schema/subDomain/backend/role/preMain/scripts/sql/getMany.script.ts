import { FindAndCountOptions, Op } from "sequelize";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getManyWithPagination(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<backendRole[]>> => {

    let data = await db.backendRole.findAll({
      transaction: d.subDomainTransaction
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


