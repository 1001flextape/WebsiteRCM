import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionLoud from "../../../../../../models/backend/project/backendProjectPageSectionLoud.model";

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

export default function addMany(d: dependencies) {
  const db = d.db.models;

  return async (
    args: input[]
  ): Promise<returningSuccessObj<Model<backendProjectPageSectionLoud>[] | null>> => {
    try {
      // Use bulkCreate for adding many records at once
      const data = await db.backendProjectPageSectionLoud.bulkCreate(
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
