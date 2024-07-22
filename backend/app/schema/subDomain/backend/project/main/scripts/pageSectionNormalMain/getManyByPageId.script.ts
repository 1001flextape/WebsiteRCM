import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionNormal from "../../../../../../../models/subDomain/backend/project/backendProjectPageSectionNormal.model";
import makeBackendProjectPageSectionNormalSql from "../../../preMain/backendProjectPageSectionNormal.sql";

type input = {
  pageId: string;
};

export default function getManyByPageId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageSectionNormal> | null>> => {

    const sql = makeBackendProjectPageSectionNormalSql(d);

    const response = sql.getManyByPageId({
      pageId: args.pageId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}