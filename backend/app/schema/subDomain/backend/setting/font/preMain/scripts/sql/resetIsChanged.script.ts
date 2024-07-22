import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingFont from "../../../../../../../../models/subDomain/backend/setting/backendSettingFont.model";


export default function resetIsChanged(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingFont> | null>> => {

    await db.backendSettingFont.upsert({
      isChanged: false,
    }, {
      transaction: d.subDomainTransaction,
    })

    return {
      success: true,
    }
  }
}
