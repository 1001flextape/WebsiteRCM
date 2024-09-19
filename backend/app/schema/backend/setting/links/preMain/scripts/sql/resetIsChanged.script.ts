import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingLink from "../../../../../../../models/backend/setting/backendSettingLink.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function resetIsChanged(d: dependencies) {
  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingLink> | null>> => {

    await db.backendSettingLink.upsert({
      isChanged: false,
    }, {
      transaction: d.dbTransaction,
    })

    return {
      success: true,
    }
  }
}
