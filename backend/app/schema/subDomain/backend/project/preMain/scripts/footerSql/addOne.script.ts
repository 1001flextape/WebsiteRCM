import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectFooter from "../../../../../../../models/subDomain/backend/project/backendProjectFooter.model";

type input = {
  projectId: string
  
  id?: string
  webAssetImport?: string
  menuJsonB?: string
  userAnswersJsonB?: string
  isReady?: boolean
  selectionType?: SelectionTypeEnum,
  selectionId?: string,
}

export default function addOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectFooter> | null>> => {
    
    // Create new instance
    const instance = await db.backendProjectFooter.create(args, {
      transaction: d.subDomainTransaction,
    })
    
    // .catch(error => d.errorHandler(error, d.loggers))

    // Return the newly created instance
    return {
      success: true,
      data: instance,
    }
  }
}
