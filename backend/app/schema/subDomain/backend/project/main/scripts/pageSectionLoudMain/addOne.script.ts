import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionLoud from "../../../../../../../models/subDomain/backend/project/backendProjectPageSectionLoud.model";
import makeBackendProjectPageSectionLoudSql from "../../../preMain/backendProjectPageSectionLoud.sql";

type input = {
  projectId: string;

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
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageSectionLoud> | null>> => {

    const sql = makeBackendProjectPageSectionLoudSql(d);

    const response = sql.addOne({
      id: args.id,
      pageId: args.pageId,
      projectId: args.projectId,
      author: args.author,
      isReady: args.isReady,
      menuJsonB: args.menuJsonB,
      name: args.name,
      selectionId: args.selectionId,
      selectionType: args.selectionType,
      userAnswersJsonB: args.userAnswersJsonB,
      webAssetImport: args.webAssetImport

    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}