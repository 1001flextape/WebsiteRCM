import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingOrganization from "../../../../../../../models/backend/setting/backendSettingOrganization.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function resetIsChanged(d: dependencies) {
  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingOrganization> | null>> => {

    await db.backendSettingOrganization.upsert({
      isChanged: false,
    }, {
      transaction: d.dbTransaction,
    })

    return {
      success: true,
    }
  }
}
