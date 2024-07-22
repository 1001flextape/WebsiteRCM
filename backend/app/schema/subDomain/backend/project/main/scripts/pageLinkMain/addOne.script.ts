import { Model } from "sequelize";
import makeBackendProjectPageLinkSql from "../../../preMain/backendProjectPageLink.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageLink from "../../../../../../../models/subDomain/backend/project/backendProjectPageLink.model";

type input = {
  projectId: string;
  
  id?: string;
  pageId: string,
  title?: string;
  description?: string;
  picture?: string;
  pictureAlt?: string;
};

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendProjectPageLink> | null>> => {

    const sql = makeBackendProjectPageLinkSql(d);
  
    const response = await sql.addOne({
      projectId: args.projectId,
      id: args.id,
      pageId: args.pageId,
      title: args.title,
      description: args.description,
      picture: args.picture,
      pictureAlt: args.pictureAlt,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}