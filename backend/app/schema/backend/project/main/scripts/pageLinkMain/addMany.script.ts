import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageLink from "../../../../../../models/backend/project/backendProjectPageLink.model";
import makeBackendProjectPageLinkSql from "../../../preMain/backendProjectPageLink.sql";

type input = {
  projectId: string;
  pageId: string;

  id?: string;
  title?: string;
  description?: string;
  picture?: string;
  pictureAlt?: string;
};

export default function addMany(d: dependencies) {
  return async (args: input[]): Promise<returningSuccessObj<Model<backendProjectPageLink> | null>> => {

    const sql = makeBackendProjectPageLinkSql(d);
  
    const response = await sql.addMany(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}