import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingLink from "../../../../../../../models/backend/setting/backendSettingLink.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  title?: string;
  description?: string;
  image?: string;
  isChanged?: boolean;
  isReady?: boolean;
}

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSettingLink> | null>> => {
    try {
      // Check if a record exists
      let instance = await db.backendSettingLink.findOne({
        transaction: d.dbTransaction,
      });

      if (instance) {
        // Update the existing record
        instance = await instance.update(
          {
            ...args,
            isChanged: true,
          },
          {
            transaction: d.dbTransaction,
          });
      } else {
        // Create a new record
        instance = await db.backendSettingLink.create(
          {
            ...args,
            isChanged: true,
          },
          {
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
