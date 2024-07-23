import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionLoud from "../../../../../../../models/subDomain/backend/project/backendProjectPageSectionLoud.model";

type input = {
  projectId: string;
  pageId: string;
  id?: string;
  name?: string;
  author?: string;
  webAssetImport?: string;
  menuJsonB?: string;
  userAnswersJsonB?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
};

export default function addOne(d: dependencies) {
  const { subDomainDb, subDomainTransaction, errorHandler, loggers } = d;
  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageSectionLoud> | null>> => {
    try {
      // Find the existing record by projectId and pageId
      let instance = await db.backendProjectPageSectionLoud.findOne({
        where: { projectId: args.projectId, pageId: args.pageId },
        transaction: subDomainTransaction,
      });

      if (instance) {
        // Update the existing record
        instance = await instance.update(args, {
          transaction: subDomainTransaction,
        });
      } else {
        // Create a new record
        instance = await db.backendProjectPageSectionLoud.create(args, {
          transaction: subDomainTransaction,
        });
      }

      return {
        success: true,
        data: instance,
      };
    } catch (error) {
      errorHandler(error, loggers);
      return {
        success: false,
        data: null,
        humanMessage: "Error during creation operation",
      };
    }
  };
}
