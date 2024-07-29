import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectFooter from "../../../../../../models/backend/project/backendProjectFooter.model";

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

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectFooter> | null>> => {
    try {
      // Find the existing record by projectId
      let instance = await db.backendProjectFooter.findOne({
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
        instance = await db.backendProjectFooter.create(args, {
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
