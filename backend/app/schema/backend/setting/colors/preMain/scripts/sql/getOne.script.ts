import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingColors from "../../../../../../../models/backend/setting/backendSettingColors.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingColors> | null>> => {

    const data = await db.backendSettingColors.findOne({
      transaction: d.dbTransaction,
      order: [['createdAt', 'DESC']]
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}