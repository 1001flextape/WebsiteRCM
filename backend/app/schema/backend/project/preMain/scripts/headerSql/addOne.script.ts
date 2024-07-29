import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectHeader from "../../../../../../models/backend/project/backendProjectHeader.model";
import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";

type input = {
  projectId: string;

  id?: string;
  webAssetImport?: string;
  menuJsonB?: string;
  userAnswersJsonB?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
}

export default function addOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectHeader> | null>> => {
    try {
      // Find the existing record by projectId
      let instance = await db.backendProjectHeader.findOne({
        where: { projectId: args.projectId },
        transaction: d.dbTransaction,
      });

      if (instance) {
        // Update the existing record
        instance = await instance.update(args, {
          transaction: d.dbTransaction,
        });
      } else {
        // Create a new record
        instance = await db.backendProjectHeader.create(args, {
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
      };
    }
  };
}
