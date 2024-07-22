import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionLoud from "../../../../../../../models/subDomain/backend/project/backendProjectPageSectionLoud.model";
import makeBackendProjectPageSectionLoudSql from "../../../preMain/backendProjectPageSectionLoud.sql";

type input = {
  pageId: string;
};


export default function getOneByPageId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageSectionLoud> | null>> => {

    const sql = makeBackendProjectPageSectionLoudSql(d);

    const response = sql.getOneByPageId({
      pageId: args.pageId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}