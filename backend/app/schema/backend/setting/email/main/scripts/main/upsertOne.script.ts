import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendSettingEmailSql from "../../../preMain/backendSettingEmail.sql";
import backendSettingEmail from "../../../../../../../models/backend/setting/backendSettingEmail.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  emailVerificationSubject?: string,
  emailVerificationMessage?: string,
  passwordResetSubject?: string,
  passwordResetMessage?: string,
  resetPasswordEmailSubject?: string,
  resetPasswordEmailMessage?: string,
  inviteUserSubject?: string,
  inviteUserMessage?: string,
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingEmail> | null>> => {

    const sql = makeBackendSettingEmailSql(d);

    const response = sql.upsertOne({
      emailVerificationSubject: args.emailVerificationSubject,
      emailVerificationMessage: args.emailVerificationMessage,
      passwordResetSubject: args.passwordResetSubject,
      passwordResetMessage: args.passwordResetMessage,
      resetPasswordEmailSubject: args.resetPasswordEmailSubject,
      resetPasswordEmailMessage: args.resetPasswordEmailMessage,
      inviteUserSubject: args.inviteUserSubject,
      inviteUserMessage: args.inviteUserMessage,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}