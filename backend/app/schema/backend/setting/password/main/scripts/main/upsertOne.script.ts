import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeFoundationSettingPasswordSql from "../../../preMain/backendSettingPassword.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingPassword from "../../../../../../../models/backend/setting/backendSettingPassword.model";
import makeBackendSettingPasswordSql from "../../../preMain/backendSettingPassword.sql";

type input = {
  passwordLength?: number
  shouldHaveUppercaseLetter?: boolean
  shouldHaveLowercaseLetter?: boolean
  shouldHaveNumber?: boolean
  shouldHaveSymbol?: boolean
}

export default function updateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingPassword> | null>> => {

    const passwordSql = makeBackendSettingPasswordSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await passwordSql.upsertOne({
      passwordLength: args.passwordLength,
      shouldHaveLowercaseLetter: args.shouldHaveLowercaseLetter,
      shouldHaveNumber: args.shouldHaveNumber,
      shouldHaveSymbol: args.shouldHaveSymbol,
      shouldHaveUppercaseLetter: args.shouldHaveUppercaseLetter,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
