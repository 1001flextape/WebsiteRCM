import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendProjectPageSectionLoudSql from "../../../preMain/backendProjectPageSectionLoud.sql";
import backendProjectPageSectionLoud from "../../../../../../models/backend/project/backendProjectPageSectionLoud.model";
import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";

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
  return async (args: input[]): Promise<returningSuccessObj<Model<backendProjectPageSectionLoud>[] | null>> => {

    const sql = makeBackendProjectPageSectionLoudSql(d);
  
    const response = await sql.addMany(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}