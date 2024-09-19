import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingHeader from "../../../../../../../models/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function resetIsChanged(d: dependencies) {
  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingHeader> | null>> => {

    await db.backendSettingHeader.upsert({
      isChanged: false,
    }, {
      transaction: d.dbTransaction,
    })

    return {
      success: true,
    }
  }
}
