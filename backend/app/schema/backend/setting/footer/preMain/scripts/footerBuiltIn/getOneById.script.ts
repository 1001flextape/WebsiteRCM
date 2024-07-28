import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingFooterBuiltIn from "../../../../../../../models/backend/setting/backendSettingFooterBuiltIn.model";

type input = {
  id: string;
}

export default function getOneById(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSettingFooterBuiltIn> | null>> => {

    const data = await db.backendSettingFooterBuiltIn.findOne({
      where: {
        id: args.id
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}