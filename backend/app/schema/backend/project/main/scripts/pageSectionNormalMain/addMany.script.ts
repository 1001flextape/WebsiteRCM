import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";
import backendProjectPageSectionNormal from "../../../../../../models/backend/project/backendProjectPageSectionNormal.model";
import makeBackendProjectPageSectionNormalSql from "../../../preMain/backendProjectPageSectionNormal.sql";

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
  return async (args: input[]): Promise<returningSuccessObj<Model<backendProjectPageSectionNormal>[] | null>> => {

    const sql = makeBackendProjectPageSectionNormalSql(d);
  
    const response = await sql.addMany(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}