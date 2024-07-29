import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionLoud from "../../../../../../models/backend/project/backendProjectPageSectionLoud.model";

type input = {
  pageId: string;
};

export default function getOneByPageId(d: dependencies) {
  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendProjectPageSectionLoud> | null>> => {

    try {
      const data = await db.backendProjectPageSectionLoud.findOne({
        where,
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
