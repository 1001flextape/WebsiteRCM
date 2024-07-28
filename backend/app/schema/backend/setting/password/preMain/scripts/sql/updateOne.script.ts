import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingPassword from "../../../../../../../models/backend/setting/backendSettingPassword.model";

type input = {
  passwordLength?,
  shouldHaveUppercaseLetter?,
  shouldHaveLowercaseLetter?,
  shouldHaveNumber?,
  shouldHaveSymbol?,
}

export default function updateOne(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSettingPassword> | null>>  => {

    const data = await db.backendSettingPassword.update(
      args,
      {
        where: {},
        returning: true,
        transaction: d.dbTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


