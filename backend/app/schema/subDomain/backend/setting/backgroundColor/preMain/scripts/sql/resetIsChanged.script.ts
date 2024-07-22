import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingBackgroundColor from "../../../../../../../../models/subDomain/backend/setting/backendSettingBackgroundColor.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function resetIsChanged(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingBackgroundColor> | null>> => {

    await db.backendSettingBackgroundColor.upsert({
      isChanged: false,
    }, {
      transaction: d.subDomainTransaction,
    })

    return {
      success: true,
    }
  }
}
