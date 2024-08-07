import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectFont from "../../../../../../models/backend/project/backendProjectFont.model";

type input = {
  projectId: string;

  id?: string;
  font?: string;
}

export default function addOne(d: dependencies) {
  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectFont> | null>> => {
    try {
      // Find the existing record by projectId
      let instance = await db.backendProjectFont.findOne({
        where: { projectId: args.projectId },
        transaction: d.dbTransaction,
      });

      if (instance) {
        // Update the existing record
        instance = await instance.update(args, {
          transaction: d.dbTransaction,
        });
      } else {
        // Create a new record
        instance = await db.backendProjectFont.create(args, {
          transaction: d.dbTransaction,
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
