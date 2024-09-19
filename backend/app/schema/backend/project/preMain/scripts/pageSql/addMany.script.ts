import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { PageStatusEnum } from "../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";
import backendProjectPage from "../../../../../../models/backend/project/backendProjectPage.model";

type input = {
  projectId: string
  slug: string
  status?: PageStatusEnum,
  isNew?: boolean
  isChanged?: boolean
  isDeleted?: boolean
};

export default function addMany(d: dependencies) {
  const db = d.db.models;

  return async (args: input[]): Promise<returningSuccessObj<Model<backendProjectPage>[] | null>> => {
    try {
      // Use bulkCreate for adding many records at once
      const data = await db.backendProjectPage.bulkCreate(
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
