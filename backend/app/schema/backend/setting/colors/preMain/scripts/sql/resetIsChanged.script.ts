import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingColors from "../../../../../../../models/backend/setting/backendSettingColors.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function resetIsChanged(d: dependencies) {
  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingColors> | null>> => {

    await db.backendSettingColors.upsert({
      isChanged: false,
    }, {
      transaction: d.dbTransaction,
    })

    return {
      success: true,
    }
  }
}
