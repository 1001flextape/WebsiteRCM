import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSettingColors from "../../../../../../../models/backend/setting/backendSettingColors.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  // color 1
  color1?: string
  color1Light1?: string
  color1Light2?: string
  color1Light3?: string
  color1Light4?: string
  color1Dark1?: string
  color1Dark2?: string
  color1Dark3?: string
  color1Dark4?: string
  // color 2
  color2?: string
  color2Light1?: string
  color2Light2?: string
  color2Light3?: string
  color2Light4?: string
  color2Dark1?: string
  color2Dark2?: string
  color2Dark3?: string
  color2Dark4?: string
  // color 3
  color3?: string
  color3Light1?: string
  color3Light2?: string
  color3Light3?: string
  color3Light4?: string
  color3Dark1?: string
  color3Dark2?: string
  color3Dark3?: string
  color3Dark4?: string
  // color 4
  color4?: string
  color4Light1?: string
  color4Light2?: string
  color4Light3?: string
  color4Light4?: string
  color4Dark1?: string
  color4Dark2?: string
  color4Dark3?: string
  color4Dark4?: string
  // color 5
  color5?: string
  color5Light1?: string
  color5Light2?: string
  color5Light3?: string
  color5Light4?: string
  color5Dark1?: string
  color5Dark2?: string
  color5Dark3?: string
  color5Dark4?: string
  // color 6
  color6?: string
  color6Light1?: string
  color6Light2?: string
  color6Light3?: string
  color6Light4?: string
  color6Dark1?: string
  color6Dark2?: string
  color6Dark3?: string
  color6Dark4?: string
  // color 7
  color7?: string
  color7Light1?: string
  color7Light2?: string
  color7Light3?: string
  color7Light4?: string
  color7Dark1?: string
  color7Dark2?: string
  color7Dark3?: string
  color7Dark4?: string
  // color 8
  color8?: string
  color8Light1?: string
  color8Light2?: string
  color8Light3?: string
  color8Light4?: string
  color8Dark1?: string
  color8Dark2?: string
  color8Dark3?: string
  color8Dark4?: string
  //color 9
  color9?: string
  color9Light1?: string
  color9Light2?: string
  color9Light3?: string
  color9Light4?: string
  color9Dark1?: string
  color9Dark2?: string
  color9Dark3?: string
  color9Dark4?: string
  isChanged?: boolean
  isReady?: boolean
}

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSettingColors> | null>> => {
    try {
      // Check if a record exists
      let instance = await db.backendSettingColors.findOne({
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
        instance = await db.backendSettingColors.create({
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
