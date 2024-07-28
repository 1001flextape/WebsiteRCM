import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingBackgroundColor from "../../../../../../../models/backend/setting/backendSettingBackgroundColor.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  backgroundColor_day?: string
  backgroundColor_night?: string
  isChanged?: boolean
  isReady?: boolean
}

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSettingBackgroundColor> | null>> => {
    try {
      // Check if a record exists
      let instance = await db.backendSettingBackgroundColor.findOne({
        transaction: d.dbTransaction,
      });

      if (instance) {
        // Update the existing record
        instance = await instance.update({
          ...args,
          isChanged: true,
        }, {
          transaction: d.dbTransaction,
        });
      } else {
        // Create a new record
        instance = await db.backendSettingBackgroundColor.create({
          ...args,
          isChanged: true,
        }, {
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
