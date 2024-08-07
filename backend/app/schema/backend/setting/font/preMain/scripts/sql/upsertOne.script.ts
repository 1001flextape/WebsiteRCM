import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingFont from "../../../../../../../models/backend/setting/backendSettingFont.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  font?: string;
  isChanged?: boolean;
  isReady?: boolean;
}

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSettingFont> | null>> => {
    try {
      // Check if a record exists
      let instance = await db.backendSettingFont.findOne({
        transaction: d.dbTransaction,
      });

      if (instance) {
        // Update the existing record
        instance = await instance.update(args, {
          transaction: d.dbTransaction,
        });
      } else {
        // Create a new record
        instance = await db.backendSettingFont.create(args, {
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
