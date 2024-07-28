import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionNormal from "../../../../../../models/backend/project/backendProjectPageSectionNormal.model";
import makeBackendProjectPageSectionNormalSql from "../../../preMain/backendProjectPageSectionNormal.sql";

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

// selectionType: SelectionTypeEnum;

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageSectionNormal> | null>> => {

    const sql = makeBackendProjectPageSectionNormalSql(d);

    const response = sql.addOne({
      pageId: args.pageId,
      projectId: args.projectId,
      author: args.author,
      menuJsonB: args.menuJsonB,
      name: args.name,
      orderNumber: args.orderNumber,
      selectionId: args.selectionId,
      selectionType: args.selectionType,
      userAnswersJsonB: args.userAnswersJsonB,
      webAssetImport: args.webAssetImport,

    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}