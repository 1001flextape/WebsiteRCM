import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionNormal from "../../../../../../../models/subDomain/backend/project/backendProjectPageSectionNormal.model";

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

export default function addOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageSectionNormal> | null>> => {
    // Use create method to add a new instance
    const instance = await db.backendProjectPageSectionNormal.create(args, {
      transaction: d.subDomainTransaction,
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
