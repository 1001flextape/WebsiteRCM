import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingEmail from "../../../../../../../models/backend/setting/backendSettingEmail.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  emailVerificationSubject: string,
  emailVerificationMessage: string,
  passwordResetSubject: string,
  passwordResetMessage: string,
  resetPasswordEmailSubject: string,
  resetPasswordEmailMessage: string,
  inviteUserSubject: string,
  inviteUserMessage: string,
}


export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSettingEmail> | null>> => {
    try {
      // Check if a record exists
      let instance = await db.backendSettingEmail.findOne({
        transaction: d.dbTransaction,
      });

      if (instance) {
        // Update the existing record
        instance = await instance.update(args, {
          transaction: d.dbTransaction,
        });
      } else {
        // Create a new record
        instance = await db.backendSettingEmail.create(args, {
          transaction: d.dbTransaction,
        });
      }

      return {
        success: true,
        data: instance,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        data: null,
        humanMessage: "Error during upsert operation",
      };
    }
  };
}
