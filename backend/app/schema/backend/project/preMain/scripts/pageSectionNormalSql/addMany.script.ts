import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionNormal from "../../../../../../models/backend/project/backendProjectPageSectionNormal.model";

type input = {
  projectId: string;
  pageId: string;

  name?: string;
  author?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
  orderNumber?: number;
  userAnswersJsonB?: string;
  webAssetImport?: string;
  menuJsonB?: string;
};

export default function addMany(d: dependencies) {
  const db = d.db.models;

  return async (
    args: input[]
  ): Promise<returningSuccessObj<Model<backendProjectPageSectionNormal>[] | null>> => {
    try {
      // Use bulkCreate for adding many records at once
      const data = await db.backendProjectPageSectionNormal.bulkCreate(
        args,
        {
          transaction: d.dbTransaction,
          returning: true,
        }
      );

      return {
        success: true,
        data,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        humanMessage: "An error occurred while adding records.",
        data: null,
      };
    }
  };
}
