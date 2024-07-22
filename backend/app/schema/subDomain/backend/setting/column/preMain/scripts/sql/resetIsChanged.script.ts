import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingColumn from "../../../../../../../../models/subDomain/backend/setting/backendSettingColumn.model";


export default function resetIsChanged(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingColumn> | null>> => {

    await db.backendSettingColumn.upsert({
      isChanged: false,
    }, {
      transaction: d.subDomainTransaction,
    })

    return {
      success: true,
    }
  }
}
