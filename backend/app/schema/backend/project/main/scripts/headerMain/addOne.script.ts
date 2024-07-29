import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectHeader from "../../../../../../models/backend/project/backendProjectHeader.model";
import makeBackendProjectHeaderSql from "../../../preMain/backendProjectHeader.sql";

type input = {
  projectId: string

  id?: string
  webAssetImport?: string
  menuJsonB?: string
  userAnswersJsonB?: string
  selectionType?: SelectionTypeEnum,
  selectionId?: string,
}

// selectionType: SelectionTypeEnum;

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectHeader> | null>> => {

    const sql = makeBackendProjectHeaderSql(d);

    const response = sql.addOne({
      projectId: args.projectId,
      
      id: args.id,
      webAssetImport: args.webAssetImport,
      menuJsonB: args.menuJsonB,
      userAnswersJsonB: args.userAnswersJsonB,
      selectionType: args.selectionType,
      selectionId: args.selectionId,

    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}