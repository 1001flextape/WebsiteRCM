import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSitePageSectionLoud from "../../../../../../models/client/site/clientSitePageSectionLoud.model";

type Input = {
  id: string;
};

export default function getOneById(d: dependencies) {
  const db = d.db.models;

  return async (args: Input): Promise<returningSuccessObj<Model<clientSitePageSectionLoud> | null>> => {
    const { id } = args;

    try {
      const data = await db.clientSitePageSectionLoud.findOne({
        where: { id },
        transaction: d.dbTransaction,
        order: [['createdAt', 'DESC']],
      });

      return {
        success: true,
        data: data || null,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        data: null,
      };
    }
  };
}
