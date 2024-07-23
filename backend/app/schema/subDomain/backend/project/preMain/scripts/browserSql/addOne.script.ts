import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectBrowser from "../../../../../../../models/subDomain/backend/project/backendProjectBrowser.model";

type input = {
  projectId: string;

  id?: string;
  favicon?: string;
  tab?: string;
}

export default function addOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectBrowser> | null>> => {
    try {
      // Find the existing record by projectId
      let instance = await db.backendProjectBrowser.findOne({
        where: { projectId: args.projectId },
        transaction: d.subDomainTransaction,
      });

      if (instance) {
        // Update the existing record
        instance = await instance.update(args, {
          transaction: d.subDomainTransaction,
        });
      } else {
        // Create a new record
        instance = await db.backendProjectBrowser.create(args, {
          transaction: d.subDomainTransaction,
        });
      }

      return {
        success: true,
        data: instance,
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
