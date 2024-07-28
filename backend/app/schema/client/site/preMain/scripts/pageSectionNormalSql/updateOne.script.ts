import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSitePageSectionNormal from "../../../../../../models/client/site/clientSitePageSectionNormal.model";

type input = {
  id: string;
  pageId?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
  orderNumber?: number;
  userAnswersJsonB?: string;
  webAssetImport?: string;
};

export default function updateOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<clientSitePageSectionNormal> | null>> => {
    const { id, ...updateFields } = args;

    // Use update method to update the instance
    const [affectedRows] = await db.clientSitePageSectionNormal.update(updateFields, {
      where: { id },
      returning: true,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    // Check if any rows were affected to determine if the update was successful
    if (affectedRows > 0) {
      // Instance updated successfully
      const updatedInstance = await db.clientSitePageSectionNormal.findByPk(id, {
        transaction: d.dbTransaction,
      });
      return {
        success: true,
        data: updatedInstance,
      };
    } else {
      // No instance found with the given ID
      return {
        success: false,
        data: null,
      };
    }
  };
}
