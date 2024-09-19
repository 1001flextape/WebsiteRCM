import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageBrowser from "../../../../../../models/backend/project/backendProjectPageBrowser.model";

type input = {
  projectId: string;
  pageId: string;

  id?: string;
  tabName?: string;
};

export default function addMany(d: dependencies) {
  const db = d.db.models;

  return async (
    args: input[]
  ): Promise<returningSuccessObj<Model<backendProjectPageBrowser>[] | null>> => {
    try {
      // Use bulkCreate for adding many records at once
      const data = await db.backendProjectPageBrowser.bulkCreate(
        args,
        {
          transaction: d.dbTransaction,
          returning: true,
        }
      );

      return {
        success: true,
        data,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        humanMessage: "An error occurred while adding records.",
        data: null,
      };
    }
  };
}
