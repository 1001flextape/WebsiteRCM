import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProjectBackgroundColor from "../../../../../../../models/subDomain/backend/project/backendProjectBackgroundColor.model";

type input = {
  projectId: string,
  
  id?: string
  backgroundColor_day?: string
  backgroundColor_night?: string
}

export default function addOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendProjectBackgroundColor> | null>> => {
    try {
      // Find the existing record by projectId
      let instance = await db.backendProjectBackgroundColor.findOne({
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
        instance = await db.backendProjectBackgroundColor.create(args, {
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
  }
}
