import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectPageBrowser from "../../../../../../../models/subDomain/backend/project/backendProjectPageBrowser.model";

type input = {
  projectId: String;
  pageId: string;

  id?: string;
  tabName?: string;
};

export default function addOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (
    args: input
  ): Promise<returningSuccessObj<Model<backendProjectPageBrowser> | null>> => {
    try {
      // Create new instance
      const instance = await db.backendProjectPageBrowser.create(args, {
        transaction: d.subDomainTransaction,
      });

      return {
        success: true,
        data: instance,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        humanMessage: "Error during creation operation",
      };
    }
  };
}
