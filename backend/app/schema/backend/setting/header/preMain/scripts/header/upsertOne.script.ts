import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingHeader, { SelectionTypeEnum } from "../../../../../../../models/backend/setting/backendSettingHeader.model";

type input = {
  webAssetImport?: string;
  menuJsonB?: string;
  userAnswersJsonB?: string;
  isChanged?: boolean;
  isReady?: boolean;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
}

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSettingHeader> | null>> => {
    try {
      // Check if a record exists
      let instance = await db.backendSettingHeader.findOne({
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
        instance = await db.backendSettingHeader.create(
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
