import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSitePageSectionNormal from "../../../../../../models/client/site/clientSitePageSectionNormal.model";

type input = {
  pageId: string;
  selectionType: SelectionTypeEnum;
  selectionId: string;
  orderNumber: number;
  userAnswersJsonB?: string;
  webAssetImport?: string;
};

export default function addOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<clientSitePageSectionNormal> | null>> => {
    // Use create method to add a new instance
    const instance = await db.clientSitePageSectionNormal.create(args, {
      transaction: d.dbTransaction,
      returning: true,
    })
    
    // .catch(error => d.errorHandler(error, d.loggers));

    // Check if the instance was successfully created
    if (instance) {
      return {
        success: true,
        data: instance,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  };
}
