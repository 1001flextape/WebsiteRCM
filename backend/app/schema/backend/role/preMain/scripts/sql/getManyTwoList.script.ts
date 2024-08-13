import { Op } from "sequelize";
import backendRole from "../../../../../../models/backend/role/backendRole.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getManyTwoList(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<{ builtInRoles: backendRole[]; customRoles: backendRole[] }>> => {

    const builtInRoles = await db.backendRole.findAll({
      where: {
        isDefault: true,
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    const customRoles = await db.backendRole.findAll({
      where: {
        isDefault: {
          [Op.not]: true,
        },
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    return {
      success: true,
      data: {
        builtInRoles: builtInRoles || [],
        customRoles: customRoles || [],
      },
    };
  }
}
