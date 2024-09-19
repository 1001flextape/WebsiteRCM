import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingSite from "../../../../../../../models/backend/setting/backendSettingSite.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function resetIsChanged(d: dependencies) {
  const db = d.db.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingSite> | null>> => {

    await db.backendSettingSite.upsert({
      isChanged: false,
    }, {
      transaction: d.dbTransaction,
    })

    return {
      success: true,
    }
  }
}
