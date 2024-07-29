import { Model, Op } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionLoud from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPageSectionLoud.model";
import { SelectionTypeEnum } from "../../../../../../../models/backend/setting/backendSettingHeader.model";

type Input = {
  pageId: string;
  id?: string;
  name?: string;
  author?: string;
  webAssetImport?: string;
  menuJsonB?: string;
  userAnswersJsonB?: string;
  isReady?: boolean;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
};

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (args: Input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionLoud> | null>> => {
    const { pageId, ...updateFields } = args;

    try {
      const [instance, created] = await db.backendSiteDesignerPageSectionLoud.findOrCreate({
        where: { pageId },
        defaults: updateFields,
        returning: true,
        transaction: d.dbTransaction,
      });

      // If not created, update the existing instance
      if (!created) {
        await instance.update(updateFields, { transaction: d.dbTransaction });
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
