import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageLink from "../../../../../../models/backend/project/backendProjectPageLink.model";

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
  const db = d.db.models;

  return async (
    args: input[]
  ): Promise<returningSuccessObj<Model<backendProjectPageLink>[] | null>> => {
    try {
      // Use bulkCreate for adding many records at once
      const data = await db.backendProjectPageLink.bulkCreate(
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
