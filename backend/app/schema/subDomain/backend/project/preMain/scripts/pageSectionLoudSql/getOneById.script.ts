import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageSectionLoud from "../../../../../../../models/subDomain/backend/project/backendProjectPageSectionLoud.model";

type Input = {
  id: string;
};

export default function getOneById(d: dependencies) {
  const { subDomainDb, subDomainTransaction, errorHandler, loggers } = d;
  const db = subDomainDb.models;

  return async (where: Input): Promise<returningSuccessObj<Model<backendProjectPageSectionLoud> | null>> => {

    try {
      const data = await db.backendProjectPageSectionLoud.findOne({
        where,
        transaction: subDomainTransaction,
        order: [['createdAt', 'DESC']],
      });

      return {
        success: true,
        data: data || null,
      };
    } catch (error) {
      errorHandler(error, loggers);
      return {
        success: false,
        data: null,
      };
    }
  };
}
