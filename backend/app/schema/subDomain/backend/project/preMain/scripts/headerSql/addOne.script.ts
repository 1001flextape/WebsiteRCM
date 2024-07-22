import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectHeader from "../../../../../../../models/subDomain/backend/project/backendProjectHeader.model";
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";

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

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectHeader> | null>> => {
    
    // Create new instance
    const instance = await db.backendProjectHeader.create(args, {
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    // Return the newly created instance
    return {
      success: true,
      data: instance,
    }
  }
}
