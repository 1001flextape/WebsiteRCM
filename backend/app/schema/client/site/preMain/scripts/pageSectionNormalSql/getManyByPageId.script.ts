import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSitePageSectionNormal from "../../../../../../models/client/site/clientSitePageSectionNormal.model";

type input = {
  pageId: string;
};

export default function getManyByPageId(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<clientSitePageSectionNormal>[]>> => {
    const { pageId } = args;

    const data = await db.clientSitePageSectionNormal.findAll({
      where: {
        pageId,
      },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    return {
      success: true,
      data: data || [],
    };
  };
}
